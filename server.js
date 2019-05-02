// import express from 'express';
const express = require('express');
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const app = express();
// import personRouter from './routes/person-route';
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); 
const personRouter = require('./routes/personRoute'),
activityRouter = require('./routes/activityRoute'),
historyRouter = require('./routes/historyRoute'),
userRouter = require('./routes/userRoute');

//Authentication package
const session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('./db/models/userModel');

// Store session in DB
const MongoStore = require('connect-mongo')(session);

var db_name = 'varsel';

mongoose.Promise = global.Promise;

//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
console.log(process.env);
//take advantage of openshift env vars when available:
//Create the options
var options = {
    url: mongodb_connection_string
};
if (process.env.DATABASE_SERVICE_NAME) {
    var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
    mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
    mongoUser = process.env[mongoServiceName + '_USER'];
    mongodb_connection_string = 'mongodb://'+mongoUser+':'+mongoPassword+'@'+mongoHost+':'+mongoPort+'/' + mongoDatabase;

    options = {
        url: mongodb_connection_string
    }
}

// console.log(mongodb_connection_string);
// mongodb_connection_string = 'mongodb://userIEC:inPSs4qtkniWP2gv@172.30.37.78:27017/' + db_name;
mongoose.connect(mongodb_connection_string, { useNewUrlParser: true })
.then(()=> console.log('DB connection successful')
).catch((err)=>{
    console.error(err);
})

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



//To manage the session
app.use(session({
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 365,
        secure: process.env.DATABASE_SERVICE_NAME ? true : false
    },
    secret: 'jhfjjlsgtqicgrtvwopsvzi',
    store: new MongoStore(options),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
      console.log(password);
      User.findOne({ 'userName': username }, function (err, user) {
          if (err) {done(err)};

          if (user != null && user.length!= 0) {
              user.comparePassword(password, function (err, isMatch) {
                  if (err) throw err;
                  console.log(password, isMatch);
                  if(isMatch){
                      return done(null, {user_id: user._id});
                    }else{
                        return done(null, false);
                }
            });
        }else{
            return done(null, false);
        }
    });
}
));

//Routing to specific router
app.use('/person', authenticationMiddleware(), personRouter);
app.use('/activities', authenticationMiddleware(), activityRouter);
app.use('/history',  authenticationMiddleware(), historyRouter);
app.use('/user', userRouter);

//Handling Logout option
app.get('/logout', (req, res)=>{
    req.logout();
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/')
    });
});

// app.get('/', (req, res) =>{
    //     console.log(req.user);
    //     console.log(req.isAuthenticated());
//     res.send('Success message + good news');
// })
// use static pages with express
app.use(express.static('public'));

function authenticationMiddleware(){
    return(req, res, next) =>{
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if(req.isAuthenticated()) return next();
        res.json('Access_denied')
    }
}

var port = 1516;
if(process.env.APPLICATION_SERVICE_PORT){
    port = process.env.APPLICATION_SERVICE_PORT;
}
app.listen(port, ()=>{
    console.log('Server started!!!');
    
});

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
    mongodb_connection_string = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDatabase;

    options = {
        url: mongodb_connection_string
    }
}

// console.log(mongodb_connection_string);
// mongodb_connection_string = 'mongodb://userIEC:inPSs4qtkniWP2gv@172.30.37.78:27017/' + db_name;
mongoose.connect(mongodb_connection_string, { useNewUrlParser: true })
    .then(() => console.log('DB connection successful')
    ).catch((err) => {
        console.error(err);
    })

app.set('trust proxy', true);

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var sess = {
    cookie: {
        maxAge: 3600000
    },
    secret: 'jhfjjlsgtqicgrtvwopsvzi',
    store: new MongoStore(options),
    resave: false,
    saveUninitialized: false
}

if (process.env.DATABASE_SERVICE_NAME) {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
    sess.proxy = true
    sess.cookie.domain = 'varsel.co.in'
}

//To manage the session
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use(isRememberMe())

passport.use(new LocalStrategy(
    function (nameOrMail, password, done) {
        console.log(nameOrMail);
        User.findOne({ $or: [{ 'userName': nameOrMail }, { 'email': nameOrMail }] }, function (err, user) {
            if (err) { return done(err) };
            if (user != null && user.length != 0) {
                if (!user.isVerified) return done(null, false, { message: 'Account not verified' })
                user.comparePassword(password, function (err, isMatch) {
                    if (err) throw err;
                    console.log(password, isMatch);
                    if (isMatch) {
                        return done(null, { user_id: user._id, lang: user.lang });
                    } else {
                        return done(null, false, { message: 'Incorrect password' });
                    }
                });
            } else {
                return done(null, false, { message: 'No user found' });
            }
        });
    }
));

//check authenticated user
app.use('/home', authenticationMiddleware());

//Routing to specific router
app.use('/person', authenticationMiddleware(), personRouter);
app.use('/activities', authenticationMiddleware(), activityRouter);
app.use('/history', authenticationMiddleware(), historyRouter);
app.use('/user', isAuthenticated(), userRouter);

//Handling Logout option
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/')
    });
});

app.get('/loginsuccess', (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    let msg = `Successful login. Lang:${req.user.lang}`;
    res.send(msg);
})
app.get('/loginfailed', (req, res) => {
    res.send(`Access_denied Message:${req.session.messages[(req.session.messages.length) - 1]}`);
})
// use static pages with express
app.use(express.static('public'));

function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.json('Access_denied')
    }
}

function isAuthenticated() {
    return (req, res, next) => {
        console.log(`is authenticated req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.path == '/login' || req.path == '/register') {
            if (req.isAuthenticated()) res.json(`Access granted. Lang:${req.session.passport.user.lang}`);
            else return next();
        } else {
            return next();
        }
    }
}

function isRememberMe() {
    return (req, res, next) => {
        if (req.body.loginkeeping)
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
        return next();
    }
}

var port = 1516;
if (process.env.APPLICATION_SERVICE_PORT) {
    port = process.env.APPLICATION_SERVICE_PORT;
}
app.listen(port, () => {
    console.log('Server started!!!');

});

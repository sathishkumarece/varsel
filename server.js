// import express from 'express';
const express = require('express');
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const app = express();
// import personRouter from './routes/person-route';
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); 
const personRouter = require('./routes/person-route'),
activityRouter = require('./routes/activity-route'),
historyRouter = require('./routes/history-route');

var db_name = 'varsel';

mongoose.Promise = global.Promise;

//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
console.log(process.env);
//take advantage of openshift env vars when available:
if (process.env.DATABASE_SERVICE_NAME) {
    var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
    mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
    mongoUser = process.env[mongoServiceName + '_USER'];
    mongodb_connection_string = 'mongodb://'+mongoUser+':'+mongoPassword+'@'+mongoHost+':'+mongoPort+'/' + mongoDatabase;
}
console.log(mongodb_connection_string);
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
app.use('/', personRouter);
app.use('/', activityRouter);
app.use('/', historyRouter);

// use static pages with express
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.send('Success message + good news');
})

var port = 1516;
if(process.env.APPLICATION_SERVICE_PORT){
    port = process.env.APPLICATION_SERVICE_PORT;
}
app.listen(port, ()=>{
    console.log('Server started!!!');
    
});

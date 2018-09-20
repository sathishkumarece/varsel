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
console.log(process.env.OPENSHIFT_MONGODB_DB_URL);
console.log(process.env.OPENSHIFT_APP_NAME);
console.log(process.env);
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

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

app.listen(1516, ()=>{
    console.log('Server started!!!');
    
});

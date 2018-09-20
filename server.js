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


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/varsel', { useNewUrlParser: true })
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

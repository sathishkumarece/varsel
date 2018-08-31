const express = require('express');
const router = express.Router();
const Activity = require('../db/models/activity-model');
const History = require('../db/models/history-model');

/* GET ALL activities */
router.get('/activities', (req, res, next) =>{
    Activity.find({'delete_flag':false}, '_id person_name amount date information category type', (err, activities) => {
      if (err) return next(err);
      res.json(activities);
    });
  });

  /* GET SINGLE PERSON BY person */
  router.get('/activities/:person', (req, res, next) => {
    Activity.find({'person_name':req.params.person, 'delete_flag':false}, function (err, activities) {
      if (err) return next(err);
      res.json(activities);
    });
  });
  
  /* GET ALL activities */
router.get('/activities/:person/calc', (req, res, next) =>{
  Activity.find( (err, activities) => {
    if (err) return next(err);
    console.log(activities.length);
    let finalAmount = 0;
    activities.forEach((activity)=>{
      console.log(activity);
      if(activity.type == 'Credit'){
        console.log('Add it');
        finalAmount += activity.amount;
      }else if(activity.type == 'Debit'){
        console.log("Sub it");
        finalAmount -=activity.amount;
      }
    });
    console.log(finalAmount)
    res.json({'finalAmount': finalAmount});
  });
});

  /* SAVE Activities */
  router.post('/activities', function(req, res, next) {
    Activity.create(req.body, function (err, post) {
       if (err) return next(err);
      res.json(post);
    });
  });

  /* UPDATE Activity */
  router.put('/activities/:name/:id', function(req, res, next) {
    Activity.findOneAndUpdate({'person_name':req.params.name, '_id':req.params.id}, req.body, function (err, post) {
      if (err) return next(err);
      // res.json({"status":"Successfully updated"});
      console.log(post);
      let data = [];
      let keys = Object.keys(req.body);
      console.log(keys);
      keys.forEach( value =>{
        data.push(historyObj(value, post[value], req.body[value]));
      });
      console.log(data);
      // res.redirect(req.baseUrl+'/history/1003');
      History.update({'activityId':req.params.id}, {$push: {'history':data}}, (err, {post}) => {
        if (err) return next(err);
        res.json({"status":"Successfully updated"});
      });
    });
  });

  /* Making delete flag enable hence it track of the records will be available */
  router.delete('/activities/:id', function(req, res, next) {
    Activity.findOneAndUpdate({"_id":req.params.id, 'delete_flag':false}, {'delete_flag':true}, function (err, post) {
      if (err) return next(err);
      res.json({"status": "Successfully deleted"});
    });
  });

  var historyObj = (key, oldValue, newValue)=>{
    let changeValue = {"old":oldValue, "new":newValue};
    let change = {"key":key, "value":changeValue};
    return change;
  }

  module.exports = router;
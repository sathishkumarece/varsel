// Router for history
const express = require('express');
const router = express.Router();
const History = require('../db/models/historyModel');
const dateFormat = require('dateformat');

/* GET ALL HISTORY */
router.get('/history', (req, res, next) =>{
    History.find( (err, history) => {
        console.log(history);
      if (err) return next(err);
      res.json(history);
    });
  });
  
  /* GET SINGLE PERSON BY person */
  router.get('/history/:id', (req, res, next) => {
    History.find({'activityId':req.params.id}, (err, history) => {
      if (err) return next(err);
      var msg = [];
      history.forEach(element => {
          let historyArray = element.history;
          historyArray.forEach((hist)=>{
              let date = dateFormat(hist.date, "yyyy-mm-dd, h:MM:ss");
              let values = [];
              hist.changes.forEach((change)=>{
                values.push(`<b>${change.key}</b> has been modified from "${change.value.old}" to "${change.value.new}"<br>`);
              });
              msg.push({'key':date,
                    'values':values});
          });
      });
      res.json(msg);
    });
  });
  
  /* Save History */
  router.post('/history', (req, res, next) => {
    History.create(req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  });
  
   /* Update history for particular activity id */
   router.put('/history/:id', (req, res, next) => {
    History.update({'activityId':req.params.id}, {$push: {'history':{'changes':req.body}}}, (err, post) => {
      if (err) return next(err);
      res.json({"status":"Successfully updated"});
    });
  });

  /* DELETE PERSON */
  /*router.delete('/person/:id', function(req, res, next) {
    Person.findOneAndRemove({"name_en":req.params.id}, req.body, function (err, post) {
      if (err) return next(err);
      res.json({"status": "Successfully deleted"});
    });
  });*/
  
  module.exports = router;
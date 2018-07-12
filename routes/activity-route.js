const express = require('express');
const router = express.Router();
const Activity = require('../db/models/activity-model');

/* GET ALL activities */
router.get('/activities', (req, res, next) =>{
    Activity.find( (err, activities) => {
        console.log(activities);
      if (err) return next(err);
      res.json(activities);
    });
  });
  
  /* GET SINGLE PERSON BY person */
  router.get('/activities/:person', (req, res, next) => {
    Activity.findOne({'person_name':req.params.person, 'delete_flag':false}, function (err, activities) {
      if (err) return next(err);
      res.json(activities);
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
  router.put('/activities/:id', function(req, res, next) {
    Activity.findOneAndUpdate({'name_en':req.params.id}, req.body, function (err, {post}) {
      if (err) return next(err);
      res.json({"status":"Successfully updated"});
    });
  });

  /* Making delete flag enable hence it track of the records will be available */
  router.delete('/activities/:id', function(req, res, next) {
    Activity.findOneAndUpdate({"person_name":req.params.id, 'delete_flag':false}, {'delete_flag':true}, function (err, post) {
      if (err) return next(err);
      res.json({"status": "Successfully deleted"});
    });
  });
  module.exports = router;
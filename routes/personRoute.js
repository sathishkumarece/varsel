// import express from 'express';
const express = require('express');
const router = express.Router();
// import Person from '../db/models/person-model'
const Person = require('../db/models/personModel');

/* GET ALL PERSONS */
router.get('/', (req, res, next) =>{
  console.log(`User_id: ${JSON.stringify(req.session.passport.user.user_id)}`);
  let user_id = req.session.passport.user.user_id;
    Person.find({"user_id":user_id}, 'name_en address phone email name_tn', (err, persons) => {
        console.log(persons);
      if (err) return next(err);
      res.json(persons);
    }).select("-_id");
  });

  router.get('/getname', (req,res, next) =>{
    let user_id = req.session.passport.user.user_id;
     Person.find({"user_id":user_id}, 'name_en', (err, persons) => {
       console.log(persons);
       if(err) return next(err);
       res.json(persons);
     }).select("-_id");
  });
  
  /* GET SINGLE PERSON BY person */
  router.get('/:person', (req, res, next) => {
    let user_id = req.session.passport.user.user_id;
    Person.findOne({'name_en':req.params.person, "user_id":user_id}, function (err, person) {
      if (err) return next(err);
      res.json(person);
    });
  });
  
  /* SAVE PERSON */
  router.post('/', function(req, res, next) {
    console.log(req.body);
    let user_id = req.session.passport.user.user_id;
    var body = Object.assign(req.body, {"user_id":user_id});
    Person.create(body, function (err, post) {
      if (err) return next(err);
      res.send(`Save success. Lang:${req.session.passport.user.lang}`);
    });
  });
  
  /* UPDATE PERSON */
  router.put('/:id', function(req, res, next) {
    let user_id = req.session.passport.user.user_id;
    Person.findOneAndUpdate({'name_en':req.params.id, "user_id":user_id}, req.body, function (err, post) {
      if (err) return next(err);
      res.json({"status":"Successfully updated"});
    });
  });
  
  /* DELETE PERSON */
  router.delete('/', function(req, res, next) {
    console.log(req);
    let user_id = req.session.passport.user.user_id;
    let query = Object.assign(req.query, {"user_id":user_id});
    console.log(query);
    Person.findOneAndRemove(query, {"select":req.body}, function (err, post) {
      if (err) return next(err);
      res.json({"status": "Successfully deleted"});
    });
  });
  
  module.exports = router;
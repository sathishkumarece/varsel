// import express from 'express';
const express = require('express');
const router = express.Router();
// import Person from '../db/models/person-model'
const Person = require('../db/models/personModel');

/* GET ALL PERSONS */
router.get('/', (req, res, next) =>{
    Person.find({}, 'name_en address phone email name_tn', (err, persons) => {
        console.log(persons);
      if (err) return next(err);
      res.json(persons);
    }).select("-_id");
  });

  router.get('/getname', (req,res, next) =>{
     Person.find({}, 'name_en', (err, persons) => {
       console.log(persons);
       if(err) return next(err);
       res.json(persons);
     }).select("-_id");
  });
  
  /* GET SINGLE PERSON BY person */
  router.get('/:person', (req, res, next) => {
    Person.findOne({'name_en':req.params.person}, function (err, person) {
      if (err) return next(err);
      res.json(person);
    });
  });
  
  /* SAVE PERSON */
  router.post('/', function(req, res, next) {
    console.log(req.body);
    var body = Object.assign(req.body, {'name_tn':'ssdv'});
    Person.create(body, function (err, post) {
      if (err) return next(err);
      console.log(post);
      res.json(post);
    });
  });
  
  /* UPDATE PERSON */
  router.put('/:id', function(req, res, next) {
    Person.findOneAndUpdate({'name_en':req.params.id}, req.body, function (err, post) {
      if (err) return next(err);
      res.json({"status":"Successfully updated"});
    });
  });
  
  /* DELETE PERSON */
  router.delete('/', function(req, res, next) {
    console.log(req);
    console.log(JSON.stringify(req.query));
    Person.findOneAndRemove(req.query, {"select":req.body}, function (err, post) {
      if (err) return next(err);
      res.json({"status": "Successfully deleted"});
    });
  });
  
  module.exports = router;
// import express from 'express';
const express = require('express');
const router = express.Router();
// import Person from '../db/models/person-model'
const Person = require('../db/models/person-model');

/* GET ALL PERSONS */
router.get('/person', (req, res, next) =>{
    Person.find( (err, persons) => {
        console.log(persons);
      if (err) return next(err);
      res.json(persons);
    });
  });
  
  /* GET SINGLE PERSON BY ID */
  router.get('/person/:person', (req, res, next) => {
    Person.findOne({'name_en':req.params.person}, function (err, person) {
      if (err) return next(err);
      res.json(person);
    });
  });
  
  /* SAVE PERSON */
  router.post('/person', function(req, res, next) {
    Person.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE PERSON */
  router.put('/person/:id', function(req, res, next) {
    Person.findOneAndUpdate({'name_en':req.params.id}, req.body, function (err, {post}) {
      if (err) return next(err);
      res.json({"success":"Successfully updated"});
    });
  });
  
  /* DELETE PERSON */
  router.delete('/person/:id', function(req, res, next) {
    Person.findOneAndRemove({"name_en":req.params.id}, req.body, function (err, post) {
      if (err) return next(err);
      res.json({"Success": "Successfully deleted"});
    });
  });
  
  module.exports = router;
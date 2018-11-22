// import express from 'express';
const express = require('express');
const router = express.Router();
// import Person from '../db/models/person-model'
const User = require('../db/models/userModel');
const passport = require('passport');

// Save the user information in the database
router.post("/", function (req, res, next) {
    console.log(req.body);
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        console.log(post);
        console.log(post['_id']);
        req.login(post['_id'], (err)=>{
             if(err) return next(err);
             res.redirect('/');
        });
        // res.json(post);
    });
});

//Fetch the user information and check whether password is matching or not
router.get("/:name", function (req, res, next) {
    console.log(req.body);
    let userName = (req.params.name).toLowerCase();
    console.log(userName);
    User.findOne({ 'userName': userName }, function (err, user) {
        if (err) return next(err);
        if (user != null) {
            user.comparePassword('Qwerty1!', function (err, isMatch) {
                if (err) throw err;
                console.log('Qwerty1!', isMatch); // -> Password123: true
                res.json(user);
            });
        }
    });
});

passport.serializeUser((user_id, done)=>{
    done(null, user_id);
});

passport.deserializeUser((user_id, done)=>{
    done(null, user_id);
});

module.exports = router;
// import express from 'express';
const express = require('express'),
 router = express.Router(),
// import Person from '../db/models/person-model'
 User = require('../db/models/userModel'),
 passport = require('passport'),
 crypto = require('crypto'),
 mail = require('../service/mail');

// Save the user information in the database
router.post("/register", function (req, res, next) {
    let body = req.body;
    body.token = crypto.randomBytes(20).toString('hex')
    User.create(body, function (err, post) {
        if (err) return next(err);
        console.log(post);
        console.log(post['_id']);
        mail.emailVerification(req);
        // req.login(post['_id'], (err) => {
        //     if (err) return next(err);
        //     res.redirect('/loginsuccess');
        // });
        res.send("Successfully registered");
    });
});

//Get the user information from login page and validate it using passport
// router.post('/login', function (req, res, next) {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) { return next(err); }
//         console.log('User: ' + user);
//         if (user == false) {
//             res.json('Access_denied');
//         }else{
//             res.json('Access_granted')
//         }
//     })(req, res, next);
// });

router.post('/login', passport.authenticate('local', {
    successRedirect: '/loginsuccess',
    failureRedirect: '/loginfailed'
}));

// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/loginfailed'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/loginsuccess');
//     })
// })(req, res, next);
// });

//verify the user mail id
router.get('/verify',(req, res, next)=>{
    User.findOneAndUpdate({'email':req.query.email, 'token':req.query.token}, {'isVerified':true}, function (err, post) {
        if (err) return next(err);
        res.send('Account verified')
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

passport.serializeUser((user_id, done) => {
    done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});

module.exports = router;
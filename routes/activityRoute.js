const express = require('express'),
 router = express.Router(),
 Activity = require('../db/models/activityModel'),
 History = require('../db/models/historyModel'),
 dateFormat = require('dateformat'),
 util = require('../service/util');

/* GET ALL activities */
router.get('/', (req, res, next) => {
  let user_id = req.session.passport.user.user_id;
  Activity.find({ 'delete_flag': false , 'user_id':user_id}, '_id person_name amount date information category type has_history', (err, activities) => {
    if (err) return next(err);
    res.json(activities);
  });
});

/* GET SINGLE PERSON BY person */
router.get('/:person', (req, res, next) => {
  let user_id = req.session.passport.user.user_id;
  Activity.find({ 'person_name': req.params.person, 'delete_flag': false, 'user_id':user_id }, function (err, activities) {
    if (err) return next(err);
    res.json(activities);
  });
});

/* GET ALL activities */
router.get('/:person/calc', (req, res, next) => {
  Activity.find((err, activities) => {
    if (err) return next(err);
    console.log(activities.length);
    let finalAmount = 0;
    activities.forEach((activity) => {
      console.log(activity);
      if (activity.type == 'Credit') {
        console.log('Add it');
        finalAmount += activity.amount;
      } else if (activity.type == 'Debit') {
        console.log("Sub it");
        finalAmount -= activity.amount;
      }
    });
    console.log(finalAmount)
    res.json({ 'finalAmount': finalAmount });
  });
});

router.get('/monthView/:type', (req, res, next) => {
  let user_id = req.session.passport.user.user_id;
  let today = new Date();
  let oneMonthBefore = util.getSpecifiedDate();
  // let oneMontBefore = today-30;
  Activity.aggregate(([
    {
      $match: {
        $and: [
          {
            type: req.params.type
          }, {
            delete_flag: false
          },{
            user_id: user_id
          }, {
            date: {
              $gte: oneMonthBefore,
              $lte: today
            }
          }
        ]
      }
    }, {
      $group: {
        _id: {
          value: "$category"
        },
        sum: {
          $sum: "$amount"
        }
      }
    }, {
      $project: {
        name: "$_id.value",
        value: "$sum",
        _id: 0
      }
    }
  ]), (err, response) => {
    if (err) return next(err);
    res.json(response);
  });
});

/* SAVE Activities */
router.post('/', function (req, res, next) {
  let user_id = req.session.passport.user.user_id;
  let body = Object.assign(req.body, {"user_id":user_id});
  Activity.create(body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Activity */
router.put('/:name/:id', function (req, res, next) {
  let user_id = req.session.passport.user.user_id;
  Activity.findOneAndUpdate({ 'person_name': req.params.name, '_id': req.params.id, 'user_id':user_id },
   req.body, function (err, post) {
    if (err) return next(err);
    // res.json({"status":"Successfully updated"});
    console.log(post);
    let data = [];
    let keys = Object.keys(req.body);
    console.log(keys);
    keys.forEach(value => {
      let oldValue = post[value];
      if ('date' === value) {
        oldValue = dateFormat(oldValue, 'mm/dd/yyyy');
      }
      if (('delete_flag' !== value) && 'has_history' !== value && (oldValue != req.body[value])) {
        data.push(historyObj(value, oldValue, req.body[value]));
      }
    });
    console.log(data);
    // res.redirect(req.baseUrl+'/history/1003');
    History.findOneAndUpdate({ 'activityId': req.params.id }, { $push: { 'history': { 'changes': data } } },
      { upsert: true }, (err, post) => {
        if (err) return next(err);
        console.log(post);
        res.json({ "status": "Successfully updated" });
      });
  });
});

/* Making delete flag enable hence it track of the records will be available */
router.delete('/:id', function (req, res, next) {
  let user_id = req.session.passport.user.user_id;
  Activity.findOneAndUpdate({ "_id": req.params.id, 'delete_flag': false, 'user_id': user_id }, { 'delete_flag': true }, function (err, post) {
    if (err) return next(err);
    res.json({ "status": "Successfully deleted" });
  });
});

var historyObj = (key, oldValue, newValue) => {
  let changeValue = { "old": oldValue, "new": newValue };
  let change = { "key": key, "value": changeValue };
  return change;
}

module.exports = router;
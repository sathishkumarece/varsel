//Model for activities
const mongoose = require('mongoose'), 
Schema = mongoose.Schema;

var ActivitiesSchema = new Schema({
    person_name: {type: String, index: true},
    amount: String,
    type: {type:String, enum: ["Credit", "Debit"]},
    information: String,
    phone: String,
    date: {type: Date, default: Date.now},
    delete_flag: Boolean
},{collection: 'activities'});

var ActivitiesModel = mongoose.model('Activities', ActivitiesSchema);

module.exports = ActivitiesModel;
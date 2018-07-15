//Model for activities
const mongoose = require('mongoose'), 
autoIncrement = require('mongoose-auto-increment'),
Schema = mongoose.Schema;

var ActivitiesSchema = new Schema({
    person_name: {type: String, index: true},
    amount: Number,
    type: {type:String, enum: ["Credit", "Debit"]},
    information: String,
    phone: String,
    date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    delete_flag: Boolean
},{collection: 'activities'});

autoIncrement.initialize(mongoose.connection);
ActivitiesSchema.plugin(autoIncrement.plugin, {model: 'Activities', startAt: 1000});
var ActivitiesModel = mongoose.model('Activities', ActivitiesSchema);

module.exports = ActivitiesModel;
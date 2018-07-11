//Model for activities
const mongoose = require('mongoose'), Schema = mongoose.Schema;

var ActivitiesSchema = new Schema({
    name_en: {
        type: String,
        required: [true, 'Why no name?']
    },
    amount: String,
    type: {type:String, enum: ["Credit", "Debit"]},
    information: String,
    phone: String,
    date: Date,
    delete_flag: boolean
},{collection: 'activities'});

var ActivitiesModel = mongoose.model('Activities', ActivitiesSchema);

module.exports = ActivitiesModel;
//To maintain the modification history for particular activity
const mongoose = require('mongoose'),
// autoIncreament = require('mongoose-auto-increment'),
Schema = mongoose.Schema;

var HistorySchema = new Schema({
    activityId : Number,
    history: [
        {
            key: String,
            value: {
                old: String,
                new: String
            },
            date: {type: Date, default: Date.now}
        }
    ],
},{collection: 'histories'});

var HistoryModel = mongoose.model('History', HistorySchema);

module.exports = HistoryModel;
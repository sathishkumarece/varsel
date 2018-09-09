//To maintain the modification history for particular activity
const mongoose = require('mongoose'),
    // autoIncreament = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

var HistorySchema = new Schema({
    activityId: Number,
    history: [
        {
            date: { type: Date, default: Date.now },
            changes: [
                {
                    key: String,
                    value: {
                        old: String,
                        new: String
                    }
                }
            ]
        }
    ],
}, { collection: 'histories' });

var HistoryModel = mongoose.model('History', HistorySchema);

module.exports = HistoryModel;
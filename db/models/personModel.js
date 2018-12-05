//Model for person object
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name_en: {
        type: String,
        required: [true, 'Why no name?']
    },
    name_tn: String,
    address: String,
    phone: String,
    email: String,
    user_id: Number
},{collection: 'person'});
PersonSchema.index({name_en: 1, user_id: 1}, { unique: true });

var PersonModel = mongoose.model('Person', PersonSchema);

module.exports = PersonModel;
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
    email: String
},{collection: 'person'});

var PersonModel = mongoose.model('Person', PersonSchema);

module.exports = PersonModel;
// models/task.js

'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    word: String , 
    wordMeaning : String , 
    imageName: String , 
    audioName : String
});

module.exports = mongoose.model('dictionary', schema);
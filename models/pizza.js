// models/task.js

'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email : String , 
    deliveryDateTime : { type: Date, default: Date.now },
    selectedPizza : [{name : String , price : String}]
});

module.exports = mongoose.model('pizza', schema);
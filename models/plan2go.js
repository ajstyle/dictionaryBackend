// models/task.js

'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    flights: [],
    hotels : [] , 
    transportations: [] , 
    attractions : []
});

module.exports = mongoose.model('trip', schema);
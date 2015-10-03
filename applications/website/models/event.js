/**
 * @module website/models/event
 */

'use strict';

var mongodb = require('mongoose');

module.exports = mongodb.model('Event', new mongodb.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    address: String,
    city: String,
    state: String,
    zip: Number
  },
  category: {
    type: String,
    enum: ['meeting', 'class', 'workshop', 'special'],
    default: 'meeting'
  },
  datetime: {
    type: Date,
    required: true
  }
}));

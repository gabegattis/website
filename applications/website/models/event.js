/**
 * @module website/models/event
 */

'use strict';

var mongodb = require('mongoose');

var Event = new mongodb.Schema({
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
});

Event.set('toObject', {
  transform: function(doc, ret, options) {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
  }
});

Event.statics.create = function(event, callback) {
  var doc = new this(event);

  doc.save(function(err) {
    if (err) {
      return callback(err);
    }

    callback(null, doc.toObject());
  });
};

module.exports = mongodb.model('Event', Event);

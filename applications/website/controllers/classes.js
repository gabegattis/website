/**
 * @module controllers/classes
 */

'use strict';

var Event = require('../models/event');

module.exports.get_upcoming_classes = function(req, res, next) {
  Event.find({
    datetime: { $gte: Date.now() },
    category: { $in: ['class', 'workshop'] }
  }).exec(function(err, events) {
    if (err) {
      return next(err);
    }

    res.render('classes', {
      events: events.map(function(e) {
        return e.toObject();
      }).sort(function(a, b) {
        return a.datetime > b.datetime;
      })
    });
  });
};

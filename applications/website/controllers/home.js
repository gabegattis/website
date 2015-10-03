/**
 * @module website/controllers/home
 */

'use strict';

var Event = require('../models/event');

module.exports = function(req, res) {
  var limit = new Date();

  limit.setDate(limit.getDate() + 30);

  Event.find({
    datetime: {
      $gte: Date.now(),
      $lte: limit
    }
  }).exec(function(err, events) {
    if (err) {
      console.log(err);
    }

    res.render('index', {
      events: err ? [] : events
    });
  });
};

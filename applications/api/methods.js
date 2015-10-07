/**
 * @module api/methods
 */

'use strict';

var Event = require('../website/models/event');

module.exports = {
  /**
   * Add a new event to the calendar
   * #add_event
   * @param {Object} event
   */
  add_event: function(rpc, event) {
    Event.create(event, function(err, result) {
      if (err) {
        return rpc.error(err.message);
      }

      rpc.response(result);
    });
  },
  /**
   * Get all upcoming events
   * #list_events
   */
  list_events: function(rpc) {
    var limit = new Date(); limit.setDate(limit.getDate() + 30);

    Event.find({
      datetime: { $gte: Date.now(), $lte: limit }
    }).exec(function(err, events) {
      if (err) {
        return rpc.error(err.message);
      }

      rpc.response(events.map(function(event) {
        return event.toObject();
      }));
    });
  },
  /**
   * Edit's an event
   * #update_event
   * @param {String} id
   * @param {Object} updates
   */
  update_event: function(rpc, id, updates) {
    Event.findOne({ _id: id }, function(err, event) {
      if (err) {
        return rpc.error(err.message);
      }

      if (!event) {
        return rpc.error('No event found by that ID');
      }

      if (typeof updates !== 'object') {
        return rpc.error('Invalid updates were supplied');
      }

      for (var u in updates) {
        event[u] = updates[u];
      }

      event.save(function(err) {
        if (err) {
          return rpc.error(err.message);
        }

        rpc.response(event.toObject());
      });
    });
  },
  /**
   * Deletes an event
   * #remove_event
   * @param {String} id
   */
  remove_event: function(rpc, id) {
    Event.remove({ _id: id }, function(err) {
      if (err) {
        return rpc.error(err.message);
      }

      rpc.response(true);
    });
  }
};

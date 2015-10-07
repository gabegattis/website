#!/usr/bin/env node

'use strict';

var request = require('request');
var program = require('commander');
var prompt = require('prompt');
var crypto = require('crypto');
var hat = require('hat');

prompt.message = 'cpadmin';

prompt.start();
program.version('0.0.1');
program.option('-e, --env [url]', 'Environment URI', 'http://localhost:8443');

program
  .command('addevent')
  .description('Add a new event to the calendar')
.action(function(env) {
  var schema = {
    properties: {
      title: {
        description: 'What is the event name',
        required: true
      },
      description: {
        description: 'Describe this event'
      },
      address: {
        description: 'Where is the event (street)'
      },
      city: {
        description: 'Where is the event (city)'
      },
      state: {
        description: 'Where is the event (state)'
      },
      zip: {
        description: 'Where is the event (zip)'
      },
      category: {
        description: 'Is this a meeting|class|workshop|special',
        conform: function(value) {
          return ~['meeting', 'class', 'workshop', 'special'].indexOf(value);
        },
        message: 'Invalid category'
      },
      datetime: {
        description: 'When is this event',
        required: true,
        conform: function(value) {
          var d = new Date(value);

          if (new Date() > d) {
            return false;
          }

          if (d.toString() === 'Invalid Date') {
            return false;
          }

          return true;
        },
        message: 'Date must be in the future and YYYY-MM-DD format'
      }
    }
  };

  prompt.get(schema, function(err, result) {
    if (err) {
      return console.log(err);
    }

    var event = {
      title: result.title,
      description: result.description,
      location: {
        address: result.address,
        city: result.city,
        state: result.state,
        zip: result.zip
      },
      category: result.category,
      datetime: result.datetime
    };

    sendRPC(env.parent.env, 'add_event', [event]);
  });
});

program
  .command('cancelevent')
  .description('Remove an event from the calendar')
.action(function(env) {
  prompt.get({
    properties: {
      id: {
        description: 'What is the event ID',
        required: true
      }
    }
  }, function(err, result) {
    if (err) {
      return console.log(err);
    }

    sendRPC(env.parent.env, 'remove_event', [result.id]);
  });
});

program
  .command('listevents')
  .description('Get event by ID')
.action(function(env) {
  sendRPC(env.parent.env, 'list_events', [], true);
});

program.parse(process.argv);

if (!program.args.length) {
  return program.help();
}

function sendRPC(uri, method, params, donotauth) {
  getCredentials(function(err, auth) {
    if (err) {
      return console.log(err);
    }

    var options = {
      url: uri + '/api',
      json: {
        method: method,
        params: params,
        id: hat()
      }
    };

    if (!donotauth) {
      options.auth = auth;
    }

    request.post(options, function(err, res, body) {
      if (err) {
        return console.log(err);
      }

      console.log(body);
    });
  }, donotauth);
}

function getCredentials(callback, donotauth) {
  if (donotauth) {
    return callback(null, {});
  }

  prompt.get({
    properties: {
      user: {
        description: 'Enter your username',
        required: true
      },
      pass: {
        description: 'Enter your password',
        required: true,
        hidden: true
      }
    }
  }, function(err, result) {
    if (err) {
      return console.log(err);
    }

    result.pass = crypto.createHash('sha256').update(result.pass).digest('hex');

    callback(null, result);
  });
}

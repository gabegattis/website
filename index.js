/**
 * @module counterpointhackers
 */

'use strict';

var assert = require('assert');
var http = require('http');
var https = require('https');
var fs = require('fs');

var mongodb = require('mongoose');
var express = require('express');
var stylus = require('stylus');
var jade = require('jade');
var favicon = require('serve-favicon');
var moment = require('moment');

var forceSSL = require('./middleware/forcessl');

/**
 * Represents the Counterpoint Server
 * @constructor
 * @param {Object} config
 */
function Server(config) {
  if (!(this instanceof Server)) {
    return new Server(config);
  }

  this.config = config;
}

/**
 * Prepares the server
 * #bootstrap
 */
Server.prototype.bootstrap = function() {
  this._configureApp();
  this._loadApplications();
  this._startServer();
  this._startRedirector();
  this._connectDatabase();
};

/**
 * Starts HTTP(S) and WS servers
 * #_configureApp
 */
Server.prototype._configureApp = function() {
  this._app = express();

  this._app.set('x-powered-by', false);
  this._app.set('views', __dirname + '/views');
  this._app.set('view engine', 'jade');
  this._app.engine('jade', require('jade').__express);
  this._app.use(stylus.middleware({
    src: __dirname + '/stylesheets',
    dest: __dirname + '/public/css'
  }));
  this._app.use(favicon(__dirname + '/public/img/favicon.png'));
  this._app.use(express.static(__dirname + '/public'));

  this._app.locals.moment = moment;
};

/**
 * Loads application routes
 * #_loadApplications
 */
Server.prototype._loadApplications = function() {
  var self = this;

  fs.readdirSync(__dirname + '/applications').map(function(name) {
    return require(__dirname + '/applications/' + name);
  }).forEach(function(manifest) {
    manifest.forEach(function(route) {
      self._app[route[0]](route[1], route[2]);
    });
  });

  this._app.all('*', function(req, res) {
    res.render('notfound');
  });

  this._app.use(function(err, req, res, next) {
    if (err) {
      return res.render('error', { error: err });
    }
  });
};

/**
 * Starts HTTP(S) server
 * #_startServer
 */
Server.prototype._startServer = function() {
  var self = this;
  var useSSL = this.config.server.ssl;
  var address = this.config.server.address;
  var port = this.config.server.port;

  if (useSSL) {
    this._server = https.createServer({
      ca: this.config.server.ca.map(function(path) {
        return fs.readFileSync(path);
      }),
      key: fs.readFileSync(this.config.server.key),
      cert: fs.readFileSync(this.config.server.cert)
    }, this._app);
  } else {
    this._server = http.createServer(this._app);
  }

  this._server.listen(port, address, function(err) {
    if (err) {
      throw err;
    }

    console.info('http(s) server listening on port: %s', port);
  });
};

/**
 * Starts HTTP redirector to HTTPS if enabled
 * #_startRedirector
 */
Server.prototype._startRedirector = function() {
  var self = this;
  var address = this.config.server.address;
  var port = this.config.server.redirect;

  if (!this.config.server.redirect) {
    return;
  }

  this._redirector = http.createServer(express().use(forceSSL(this.config)));

  this._redirector.listen(port, address, function(err) {
    if (err) {
      throw err;
    }

    console.info('redirecting from port: %s', self.config.server.redirect);
  });
};

/**
 * Connects to configured MongoDB instance
 * #_connectDatabase
 */
Server.prototype._connectDatabase = function() {
  var self = this;

  this.storage = mongodb.connect(
    'mongodb://' + this.config.storage.user +
    ':' + this.config.storage.pass +
    '@' + this.config.storage.host +
    ':' + this.config.storage.port +
    '/' + this.config.storage.name,
    function done(err) {
      if (err) {
        console.log('error connecting to database', err);
        process.exit();
      } else {
        console.log('connected to database: %s', self.config.storage.name);
      }
    }
  );
};

module.exports = Server;

/**
 * @module applications/api
 */

'use strict';

var RPCHandler = require('jsonrpc').RPCHandler;
var RPC_METHODS = require('./methods');
var DEBUG = true;

module.exports = [
  ['post', '/api', process_api_request]
];

function process_api_request(req, res, next) {
  // TODO: handle HTTP Basic Auth
  return new RPCHandler(req, res, RPC_METHODS, DEBUG);
}

/**
 * @module config
 */

'use strict';

var HOME = process.env['HOME'];
var CONFIG = HOME + '/.counterpoint.json';

module.exports = require(CONFIG);

'use strict';

var fs = require('fs');
var Server = require('..');
var configFile = fs.readFileSync(process.argv[2]);

Server(configFile).bootstrap();

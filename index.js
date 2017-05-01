#! /usr/bin/env node
var commander = require('commander');
var commandsLoader = require('./commands/index.js');

commandsLoader(commander);

commander
  .version('0.0.1')
  .parse(process.argv);




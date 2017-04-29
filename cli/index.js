#! /usr/bin/env node

var chalk = require('chalk');
var figlet = require('figlet');
var commander = require('commander');
var commandsLoader = require('./commands/index.js');
var fs = require('fs');

console.log(
  chalk.blue(
    figlet.textSync('React Redux CLI', { 'horizontalLayout': 'full' })
  )
);

commandsLoader(commander);


// commander
//   .command('create-component')
//   .description('create component')
//   .action(function(module, command) {
//     console.log(module, 'hello');
//   });

commander
  .version('0.0.1')
  .parse(process.argv);




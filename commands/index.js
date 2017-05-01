var path = require('path');
var fs = require('fs');

module.exports = function initialise(commanderInstance) {
  var commands = {};
  var loadPath = path.dirname(__filename);
  fs.readdirSync(loadPath).filter(function(fileName) {
    return (/\.js$/.test(fileName) && fileName !== 'index.js');
  }).forEach(function(fileName) {
    var commandName = fileName.substr(0, fileName.lastIndexOf('.'));
    var command = require(path.join(loadPath, fileName));
    commands[commandName] = command(commanderInstance);
  });
  return commands;
}

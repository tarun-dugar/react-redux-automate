var fs = require('fs');
var path = require('path');
var replaceAll = require('replaceall');

var util = require('../util');
var containerTemplate = require('../templates/container');

module.exports = function createContainer(commanderInstance) {
  commanderInstance
    .command('create-container <containerName>')
    .alias('ct')
    .option('-p, --path [path]', 'path relative to present working directory where component needs to be created.')
    .action(function(containerName, command) {
      containerTemplate = replaceAll("{{containerName}}", containerName, containerTemplate);
      var pathForContainer = util.normalizePath(command.path);
      if (pathForContainer) {
        fs.writeFile(pathForContainer + containerName + '.js', containerTemplate, util.fsShowGenericError);
      }
    })
}
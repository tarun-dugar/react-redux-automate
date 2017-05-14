var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var replaceAll = require('replaceall');

var classComponentTemplate = require('../templates/classComponent');
var statelessComponentTemplate = require('../templates/statelessComponent');
var util = require('../util');

module.exports = function createComponent(commanderInstance) {
  commanderInstance
    .command('create-component <componentName>')
    .alias('cc')
    .option('-p, --path [path]', 'path relative to present working directory where component needs to be created.')
    .option('-s, --stateless', 'component created will be stateless')
    .option('-c, --class', 'component will be created using "class"')
    .action(function(componentName, command) {
      var template = classComponentTemplate;
      if (command.stateless) {
        template = statelessComponentTemplate;
      }
      template = replaceAll("{{componentName}}", componentName, template);
      var pathForComponent = util.normalizePath(command.path);
      if (fs.existsSync(pathForComponent)) {
        fs.writeFile(pathForComponent + componentName + '.js', template, util.fsShowGenericError);
      } else {
        console.error(chalk.red('The path where you want to create the component does not exist!'));
      }
    })
}
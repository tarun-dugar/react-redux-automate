var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var chalk = require('chalk');
var spawn = require('child_process').spawn;
var util = require('../util');
var webpackTemplate = require('../templates/webpack.config');
var packageJSONTemplate = require('../templates/packageJSON');
var rootReducerTemplate = require('../templates/rootReducer');
var routesTemplate = require('../templates/routes');
var storeTemplate = require('../templates/store');
var appDucksTemplate = require('../templates/appDucks');
var appContainerTemplate = require('../templates/appContainer');
var entryScriptTemplate = require('../templates/entryScript');
var gitignoreTemplate = require('../templates/gitignore');
var baseTemplate = require('../templates/baseTemplate');

function fsWriteWebpack(appRoot) {
  fs.writeFile(appRoot + 'webpack.config.js', webpackTemplate, util.fsShowGenericError);
}

function fsWritePackageJSON(appRoot) {
  fs.writeFile(appRoot + 'package.json', packageJSONTemplate, util.fsShowGenericError);
}

function fsWriteRootReducer(appRoot) {
  fs.mkdirSync(appRoot + 'src');
  fs.mkdirSync(appRoot + 'src/config');
  fs.writeFile(appRoot + 'src/config/rootReducer.js', rootReducerTemplate, util.fsShowGenericError);
}

function fsWriteRoutes(appRoot) {
  fs.writeFile(appRoot + 'src/config/routes.js', routesTemplate, util.fsShowGenericError);
}

function fsWriteStore(appRoot) {
  fs.writeFile(appRoot + 'src/config/store.js', storeTemplate, util.fsShowGenericError);
}

function fsWriteAppDucks(appRoot) {
  fs.mkdirSync(appRoot + 'src/ducks');
  fs.writeFile(appRoot + 'src/ducks/App.js', appDucksTemplate, util.fsShowGenericError);
}

function fsWriteEntryScript(appRoot) {
  fs.writeFile(appRoot + 'src/index.js', entryScriptTemplate, util.fsShowGenericError);
}

function fsWriteGitignore(appRoot) {
  fs.writeFile(appRoot + '.gitignore', gitignoreTemplate, util.fsShowGenericError);
}

function fsWriteBaseTemplate(appRoot) {
  fs.writeFile(appRoot + 'src/base-template.html', baseTemplate, util.fsShowGenericError);
}

function fsWriteAppContainer(appRoot) {
  fs.mkdirSync(appRoot + 'src/modules');
  fs.mkdirSync(appRoot + 'src/modules/App');
  fs.writeFile(appRoot + 'src/modules/App/index.js', appContainerTemplate, util.fsShowGenericError);
}

function fsWriteStyles(appRoot) {
  fs.mkdirSync(appRoot + 'src/styles');
  fs.writeFile(appRoot + 'src/styles/main.scss', '', util.fsShowGenericError);
}

function runYarn(appRoot) {
  var yarn = spawn('yarn', {
    cwd: path.join(cwd, appRoot)
  });
  yarn.stdout.on('data', function(data) {
    console.log(data.toString());
  });
  yarn.stderr.on('data', function(data) {
    console.error(chalk.red(data.toString()));
  });
}

module.exports = function init(commanderInstance) {
  commanderInstance
    .command('new')
    .description('initialise new app')
    .action(function() {
      if (process.argv.length !== 4) {
        console.error(chalk.red('Please supply a folder name under which your app will be created: rr init <folder_name>'));
        return;
      }
      var appRoot = process.argv.pop() + '/';
      if (!fs.existsSync(path.join(cwd, appRoot))) {
        fs.mkdirSync(appRoot)
        fsWriteWebpack(appRoot);
        fsWritePackageJSON(appRoot);
        fsWriteRootReducer(appRoot);
        fsWriteRoutes(appRoot);
        fsWriteStore(appRoot);
        fsWriteAppDucks(appRoot);
        fsWriteEntryScript(appRoot);
        fsWriteGitignore(appRoot);
        fsWriteAppContainer(appRoot);
        fsWriteBaseTemplate(appRoot);
        fsWriteStyles(appRoot);
        runYarn(appRoot);
      } else {
        console.error(chalk.red('The directory ' + appRoot + ' already exists!'));
      }
    });
}
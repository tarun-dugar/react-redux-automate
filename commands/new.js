var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var chalk = require('chalk');
var spawn = require('child_process').spawn;

function fsWriteWebpack(appRoot) {
  var webpackTemplate = fs.readFileSync(path.join(__dirname, '../templates/webpack.config.txt'));
  fs.writeFile(appRoot + 'webpack.config.js', webpackTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWritePackageJSON(appRoot) {
  var packageJSONTemplate = fs.readFileSync(path.join(__dirname, '../templates/package.json.txt'));
  fs.writeFile(appRoot + 'package.json', packageJSONTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteRootReducer(appRoot) {
  var rootReducerTemplate = fs.readFileSync(path.join(__dirname, '../templates/rootReducer.txt'))
  fs.mkdirSync(appRoot + 'src');
  fs.mkdirSync(appRoot + 'src/config');
  fs.writeFile(appRoot + 'src/config/rootReducer.js', rootReducerTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteRoutes(appRoot) {
  var routesTemplate = fs.readFileSync(path.join(__dirname, '../templates/routes.txt'));
  fs.writeFile(appRoot + 'src/config/routes.js', routesTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteStore(appRoot) {
  var routesTemplate = fs.readFileSync(path.join(__dirname, '../templates/store.txt'));
  fs.writeFile(appRoot + 'src/config/store.js', routesTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteAppDucks(appRoot) {
  var appDucksTemplate = fs.readFileSync(path.join(__dirname, '../templates/App.ducks.txt'));
  fs.mkdirSync(appRoot + 'src/ducks');
  fs.writeFile(appRoot + 'src/ducks/App.js', appDucksTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteEntryScript(appRoot) {
  var entryScriptTemplate = fs.readFileSync(path.join(__dirname, '../templates/entryScript.txt'));
  fs.writeFile(appRoot + 'src/index.js', entryScriptTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteGitignore(appRoot) {
  var gitignoreTemplate = fs.readFileSync(path.join(__dirname, '../templates/gitignore.txt'));
  fs.writeFile(appRoot + '.gitignore', gitignoreTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteBaseTemplate(appRoot) {
  var baseTemplate = fs.readFileSync(path.join(__dirname, '../templates/base-template.txt'));
  fs.writeFile(appRoot + 'src/base-template.html', baseTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteAppContainer(appRoot) {
  var appContainerTemplate = fs.readFileSync(path.join(__dirname, '../templates/App.container.txt'));
  fs.mkdirSync(appRoot + 'src/modules');
  fs.mkdirSync(appRoot + 'src/modules/App');
  fs.writeFile(appRoot + 'src/modules/App/index.js', appContainerTemplate, function (err) {
    return err && console.error(chalk.red(err));
  });
}

function fsWriteStyles(appRoot) {
  fs.mkdirSync(appRoot + 'src/styles');
  fs.writeFile(appRoot + 'src/styles/main.scss', '', function (err) {
    return err && console.error(chalk.red(err));
  });
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
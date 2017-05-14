var fs = require('fs');
var chalk = require('chalk');
var path = require('path');

function fsShowGenericError(err) {
  return err && console.error(chalk.red(err));
}

function normalizePath(relativePath) {
  var finalPath = process.cwd();
  if (typeof relativePath === 'string') {
    finalPath = path.join(finalPath, relativePath);
  }
  finalPath = (
    finalPath[finalPath.length - 1] === '/' ? finalPath : finalPath + '/'
  );
  if (fs.existsSync(finalPath)) {
    return finalPath;
  }
  console.error(chalk.red('Path does not exist!'));
  return false;
}

module.exports = {
  fsShowGenericError : fsShowGenericError,
  normalizePath: normalizePath
};
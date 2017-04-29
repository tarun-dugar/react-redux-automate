var fs = require('fs');
var path = require('path');

module.exports = function init(commanderInstance) {
  commanderInstance
    .command('init')
    .description('initialise new app')
    .action(function(module, command) {
      var webpackTemplate = fs.readFileSync(path.join(__dirname, '../templates/webpack.config.txt'));
      fs.writeFile('webpack.config.js', webpackTemplate, function (err) {
        return err && console.error(err);
      })
    });
}
var fs = require('fs');

module.exports = function init(commanderInstance) {
  commanderInstance
    .command('init')
    .description('initialise new app')
    .action(function(module, command) {
      fs.writeFile('webpack.config.js', function (err) {

      })
    });
}
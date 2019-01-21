const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const chalk = require('chalk');
const log = console.log;

module.exports = function (config) {
  const configObj = webpackConfig(config);
  const compiler = webpack(configObj);

  if (config.env === 'dev') {
    return compiler.watch({}, (err, stats) => {
      errorHandler(err, stats, 'Watching...');
    });
  }

  if (config.env === 'prod') {
    return compiler.run((err, stats) => {
      errorHandler(err, stats, 'Assets compiled');
    });
  }

  function errorHandler (err, stats, complete) {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        log(chalk.red(err.details));
      }
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      log(chalk.red(info.errors));
    }
    if (stats.hasWarnings()) {
      log(chalk.yellow(info.warnings));
    }
    log(chalk.green(`${complete}`));
  }
};

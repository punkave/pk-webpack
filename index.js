const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const chalk = require('chalk');
const log = console.log;

module.exports = function (appRoot, config, options) {
  const configObj = { ...webpackConfig(appRoot), ...config };

  if (options.serve === true) {
    console.log(configObj);
    return configObj;
  }

  if (config.mode === 'development') {
    log(chalk.black.bgGreen('Running in DEVELOPMENT mode'));
    return webpack(configObj).watch({}, (err, stats) => {
      errorHandler(err, stats, 'Watching files...');
    });
  }

  if (config.mode === 'production') {
    log(chalk.black.bgGreen('Running in PRODUCTION mode'));
    return webpack(configObj).run((err, stats) => {
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

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const chalk = require('chalk');
const log = console.log;

module.exports = function (appRoot, config, options) {
  const configObj = { ...webpackConfig(appRoot), ...config };
  const compiler = webpack(configObj);
  const server = new WebpackDevServer(compiler, configObj.devServer);

  if (options && options.serve === true) {
    server.listen(3000, '127.0.0.1', () => {
      log(chalk.black.bgGreen('Starting server on http://localhost:3000'));
    });
  }

  if (config.mode === 'development') {
    log(chalk.black.bgGreen('Running in DEVELOPMENT mode'));
    return compiler.watch({}, (err, stats) => {
      errorHandler(err, stats, 'Watching files...');
    });
  }

  if (config.mode === 'production') {
    log(chalk.black.bgGreen('Running in PRODUCTION mode'));
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

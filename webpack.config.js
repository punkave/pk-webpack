const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const spawn = require('child_process').spawn;
const chalk = require('chalk');
const path = require('path');
const log = console.log;
let node;

module.exports = function (appRoot) {
  return {
    entry: [`${appRoot}/src/js/site.js`, `${appRoot}/src/scss/site.scss`],
    devServer: {
      port: 3001,
      writeToDisk: true,
      quiet: true,
      overlay: {
        warnings: true,
        errors: true
      },
      after: function (app, server) {
        log(chalk.bgGreen.black('Launching Apostrophe...'));
        if (node) node.kill();
        node = spawn('node', ['app.js'], {stdio: 'inherit'});
      }
    },
    devtool: '#eval-source-map',
    output: {
      path: `${appRoot}/public/js/`,
      filename: 'always.js',
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 500000
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `../css/always.css`
      }),
      new StyleLintPlugin({
        failOnError: false,
        configFile: path.join(__dirname, './.stylelintrc')
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            configFile: path.join(__dirname, './.eslintrc')
          }
        },
        {
          test: /.scss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /.scss$/,
          loader: 'postcss-loader',
          options: {
            syntax: 'postcss-scss',
            plugins: [
              require('autoprefixer')({
                'browsers': ['> 1%', 'last 2 versions']
              }),
              require('postcss-import')
            ]
          }
        },
        {
          test: /.scss$/,
          use: [
            'sass-loader'
          ]
        }
      ]
    }
  };
};

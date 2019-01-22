const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = function (appRoot) {
  return {
    entry: [`${appRoot}/src/js/site.js`, `${appRoot}/src/scss/site.scss`],
    devtool: '#eval-source-map',
    output: {
      path: `${appRoot}/public/js/`,
      filename: 'always.js',
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `../css/always.css`
      }),
      new StyleLintPlugin({
        failOnError: false,
        configFile: path.join(__dirname, './.stylelintrc.json')
      })
    ],
    resolve: {
      modules: [ path.join(__dirname, 'node_modules') ]
    },
    resolveLoader: {
      modules: [ path.join(__dirname, 'node_modules') ],
      extensions: [ '.js', '.json' ]
    },
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
            configFile: path.join(__dirname, './.eslintrc.json')
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

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoPrefixer = require('autoprefixer');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/app/base-template.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname + '/src',
        exclude: '/node_modules/',
        query: {
          presets: ['babel-preset-latest', 'babel-preset-react']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss-loader!sass')
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared']
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin('./main.css', {
      allChunks: true
    })
  ],
  postcss() {
    return [autoPrefixer({
      'browsers': [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 40',
        'Firefox >= 30',
        'Explorer >= 10',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ]
    })];
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true
};

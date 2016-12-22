const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [HTMLWebpackPluginConfig],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true
};
module.exports = `"use strict";
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = process.env.NODE_ENV === 'production' ? 'production' : 'dev';

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + (path.resolve(__dirname, './node_modules'))
];

let plugins = [
  new HtmlWebpackPlugin({
    'template': './src/base-template.html'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('styles/[name].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    'process.env.APP_VERSION': JSON.stringify(require('./package.json').version)
  }),
  new webpack.LoaderOptionsPlugin({
    'options': {
      'context': __dirname,
      'postcss': [autoprefixer({
        'browsers': [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      })]
    }
  })
]

if (env === 'production') {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      'sourceMap': true,
      'minimize': true
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]);
}

module.exports = {
  'devtool': 'source-map',
  'node': {
    'fs': 'empty'
  },
  'entry': [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  'module': {
    'loaders': [{
      'test': /manifest.json$/,
      'loader': 'file-loader?name=manifest.json!web-app-manifest-loader'
    }, {
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'react-hot-loader/webpack'
    }, {
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'babel-loader',
      'options': {
        'presets': [
          'es2015',
          'react'
        ]
      }
    }, {
      'test': /\.(scss|css)$/,
      'loader': ExtractTextPlugin.extract({
        'fallback': 'style-loader',
        'use': sassLoaders.join('!')
      })
    }, {
      'test': /\.(woff(2)?|ttf|eot|svg)?$/,
      'exclude': /images/, // Don't run this on images or else svg image paths would be screwed
      'loader': 'file-loader?name=fonts/[name].[ext]'
    }, {
      'test': /\.(jpe?g|png|gif|svg)$/i,
      'loaders': [
        'file-loader?name=images/[name].[ext]',
        {
          'loader': 'image-webpack-loader',
          'query': {
            'gifiscle': {
              'interlaced': false
            },
            'optipng': {
              'optimizationLevel': 7
            },
            'bypassOnDebug': true
          }
        }
      ]
    }]
  },
  'resolve': {
    'extensions': ['.js', '.scss']
  },
  'output': {
    'path': path.resolve(__dirname, './dist'),
    'publicPath': '/',
    'filename': 'scripts/bundle.js'
  },
  'devServer': {
    'contentBase': './dist',
    'historyApiFallback': true,
    'hot': true
  },
  'plugins': plugins
};
`;
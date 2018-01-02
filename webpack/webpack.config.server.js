'use strict';

var webpack = require('webpack');
var path = require('path');

var SRC_PATH = path.join(__dirname, '../src');
var cssLoader = 'css-loader/locals?modules&localIdentName=[path]--[local]---[hash:base64:5]';

module.exports = {
  target: 'node',

  entry: {
    server: './src/server.js',
  },

  devtool: 'source-map',
  
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: SRC_PATH
      },
      {
        test: /\.css$/,
        loader: cssLoader
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[hash].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: '[name].[hash].[ext]',
          limit: 25000,
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json', 'css'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: []
};

'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_PATH = path.join(__dirname, '../src');
var cssLoader = 'css-loader?modules&localIdentName=[path]--[local]---[hash:base64:5]';

module.exports = {
  target: 'web',

  entry: {
    client: './src/client.js',
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
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: cssLoader
        })
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
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    }),
  ]
};

'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackCommon = require('./webpack.config');

module.exports = merge(webpackCommon, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': false
    })
  ]
});

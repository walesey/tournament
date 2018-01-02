var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var configClient = require('./webpack/webpack.config.prod');
var configServer = require('./webpack/webpack.config.server');

gulp.task('build', ['build-client', 'build-server']);

gulp.task('build-client', function() {
  return gulp.src('./src/client.js')
  .pipe(webpackStream(configClient, webpack))
  .pipe(gulp.dest('dist'));
});

gulp.task('build-server', function() {
  return gulp.src('./src/server.js')
  .pipe(webpackStream(configServer, webpack))
  .pipe(gulp.dest('dist'));
});
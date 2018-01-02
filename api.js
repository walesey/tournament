require('babel-polyfill');
require('babel-core/register')({
    presets: ['es2015', 'stage-1']
});
require('./src/api');
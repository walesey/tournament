require('babel-polyfill');
require('babel-core/register')({
    presets: ['es2015', 'react', 'stage-1']
});
require('./src/devServer');
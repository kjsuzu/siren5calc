const path = require('path');
const webpack = require('webpack');

let config = require('./webpack.base.config');

config.mode = 'development';
config.output.path = path.resolve('./dev');
config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'DEBUG': true,
    }),
]);

module.exports = config;

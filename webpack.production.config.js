const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let config = require('./webpack.base.config');

config.mode = 'production';
config.output.path = path.resolve('./docs');
config.plugins = config.plugins.concat([
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
        'DEBUG': false,
    }),
]);

module.exports = config;

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        main: './src/index',
    },
    output: {
        filename: 'js/[name]-[hash:8].js',
        library: 'app',
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style-[hash:8].css',
        }),
        new HtmlWebpackPlugin({
            template: './assets/index.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: '> 0.25%, not dead',
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                    },
                                ],
                            ],
                        },
                    },
                ],
            }, {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                ],
            }, {
                test: /\.(jpe?g|png|gif|svg|ttf|woff2?|eot|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: (url, resourcePath, context) => {
                                resolved = resolvePath(url, resourcePath, context);
                                // put '../' since all files are supposed to be loaded from css
                                // which will be placed at 'css/style*.css'
                                resolved += '../';
                            },
                            outPath: resolvePath,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
    },

    resolve: {
        modules: ['node_modules',],
        extensions: ['.js',],
        fallback: {
            crypto: false,
        }
    },
}

function resolvePath(url, resourcePath, context) {
    let relpath = path.relative(context, resourcePath);
    let relpaths = relpath.split(path.sep);
    // for node_modules, i.e. external library
    if (relpaths[0] == 'node_modules') {
        // remove 'node_modules' prefix
        relpaths.splice(0, 1);
        // remove 1st 'dist' so that path looks better
        let idx = relpaths.indexOf('dist');
        if (idx >= 0) {
            relpaths.splice(idx, 1);
        }
    } else {
        // for our own file, place in img dir
        relpaths.unshift('img');
    }
    return path.join.apply(null, relpaths);
}

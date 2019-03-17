/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, 'src', 'index.js'),
    },

    output: {
        path: path.join(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=/[hash].[ext]',
            },

            { test: /\.json$/, loader: 'json-loader' },

            {
                loader: 'babel-loader',
                test: /\.js?$/,
                exclude: /node_modules/,
                query: { cacheDirectory: true },
            },

            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['data/webpack.json'],
            cleanAfterEveryBuildPatterns: ['dist/**/*.js', 'dist/**/*.css'],
        }),

        new AssetsPlugin({
            filename: 'webpack.json',
            path: path.join(process.cwd(), 'data'),
            prettyPrint: true,
        }),
    ],
};

/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: '[name].[contenthash:5].js',
        chunkFilename: '[id].[contenthash:5].css',
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),

            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:5].css',
                chunkFilename: '[id].[contenthash:5].css',
            }),

            new OptimizeCSSAssetsPlugin({}),
        ],
    },
});

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const srcPath = path.join(__dirname, 'src');

module.exports = {
    entry: {
        main: path.join(srcPath, 'index.js'),
        home: path.join(srcPath, 'pages', 'home', 'index.js'),
        cv: path.join(srcPath, 'pages', 'cv', 'index.js'),
    },

    output: {
        path: path.join(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.(jpg|png|eot|woff2?|svg|gif|csv)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media',
                    name: '[contenthash].[ext]',
                },
            },

            { test: /\.json$/, loader: 'json-loader' },

            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                query: { cacheDirectory: true },
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
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

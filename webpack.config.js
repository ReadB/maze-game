const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './src/index.js',
    output: {
        path: buildPath,
        filename: '[name].[hash].js'
    },
    devServer: {
        contentBase: buildPath,
    },
    plugins: [
        new HtmlWebpackPlugin({ 'title': 'Maze Game' })
    ]
};
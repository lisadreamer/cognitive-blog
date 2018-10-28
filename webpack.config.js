const webpack = require('webpack');
const path    = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './client/index.js',
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath : ''
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 40000 } // Convert images < 40kb to base64 strings
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        })
    ]
};

module.exports = config;

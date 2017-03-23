var webpack = require('webpack');

var path = require('path');

var helpers = require('./helpers');

var webpackMerge = require('webpack-merge');

var CopyWebpackPlugin = require('copy-webpack-plugin');

//抽取css文件

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var commonConfig = require('./webpack.common.js');




// Webpack Config

var webpackDevConfig = {

    devtool: 'source-map',

    //devtool: 'cheap-module-eval-source-map',

    output: {

        publicPath: '/',

        path: helpers.root('dist'),

        filename: "[name].js",

        sourceMapFilename: '[name].map',

        chunkFilename: "[id].chunk.js"

    },




    plugins: [

        new CopyWebpackPlugin([

            {from: 'src/assets/i18n', to: 'assets/i18n'}

        ]),




        //new ExtractTextPlugin('[name].css')//css独立打包待解决

    ],




    devServer: {

        historyApiFallback: true,

        //重载速度配置poll：bundle前的时间，aggregateTimeout：bundle后的时间

        watchOptions: {aggregateTimeout: 300, poll: 1000},

        proxy: {

            '/api/*': {

                target: 'http://localhost:8888',

                secure: false

            }

        }

    },

};







module.exports = webpackMerge(commonConfig, webpackDevConfig);
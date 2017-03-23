var webpack = require('webpack');

var path = require('path');

var helpers = require('./helpers');

var webpackMerge = require('webpack-merge');

var CopyWebpackPlugin = require('copy-webpack-plugin');

//抽取css文件

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

var commonConfig = require('./webpack.common.js');


var webpackProConfig = {

    output: {

        publicPath: '/',

        path: helpers.root('dist'),

        filename: "[name].js",

        chunkFilename: "[id].chunk.js"

    },

    plugins: [

        new CopyWebpackPlugin([

            {from: 'src/assets/i18n', to: 'assets/i18n'},

            /*{from: 'src/assets/img/step', to: 'assets/img/step'},

             {from: 'src/assets/img/overview', to: 'assets/img/overview'},

             {from: 'src/assets/img/app/status', to: 'assets/img/app/status'}*/

        ]),

        /* new webpack.optimize.UglifyJsPlugin({   //压缩代码,缩小3倍

         compress: {

         warnings: false

         },

         except: ['$super', '$', 'exports', 'require'] //排除关键字

         }),*/

        new ParallelUglifyPlugin({

            cacheDir: '.cache/',

            uglifyJS: {

                output: {

                    comments: false

                },

                compress: {

                    warnings: false

                }

            }

        }),

        //new ExtractTextPlugin('[name].css')//css独立打包待解决

    ]

};

module.exports = webpackMerge(commonConfig, webpackProConfig);
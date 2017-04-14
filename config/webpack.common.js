var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//抽取css文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var helpers = require('./helpers');
var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
  // 相对于项目根目录
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss', '.json'],
    modules: [helpers.root('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        //loader: 'happypack/loader?id=ts'
        //exclude: /node_modules/,
        //加angular2-webpack2-lazy-children-loader’替换angular2-router-loader会自动为aot异步加载时添加后缀ngfactory
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      },
      {
        test: /\.css$/,
        //loader: 'happypack/loader?id=css'
        loaders: ['to-string-loader', 'style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        //loader: 'happypack/loader?id=sass'
        loader: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /initial\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader?sourceMap'
        })
      },
      /* {
       // 小图片少时，不建议使用，路径较乱,会替换html、css中图片名字 前面的所有相对位置
       test: /\.(png|jpe?g|gif|ico)$/i,
       //官方说法：是对file-loader的上层封装，可以转化为64-data，大于4096则使用file-loader
       // 测试发现 url与file同时写，会将图片打包复制两次，暂时注释
       loader: 'url-loader?limit=40&name=assets/images/[name].[hash].[ext]'

       },*/
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        loader: 'file-loader?name=assets/images/[name].[hash].[ext]' //保证文件名相同
        //loader: 'happypack/loader?id=jpg'
      },

      {
        test: /\.html$/,
        loader: 'html-withimg-loader'//打包 HTML 文件中的图片资源,暂未生效
      },
      {
        test: /\.woff(2)?(\?v=.+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=.+)?$/,
        loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      },
      {test: /\.html$/, loader: 'raw-loader'}
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      helpers.root('src'),
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
    //传入字符串参数，由chunkplugin自动计算提取,把所有入口节点的公共代码提取出来, 生成一个common.js

    //new webpack.optimize.CommonsChunkPlugin('common'),

    //new ForkCheckerPlugin(),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({                   //根据模板插入css/js等生成最终HTML
      //favicon:'./src/assets/img', //favicon路径
      filename: '/index.html',   //生成的html存放路径，相对于 path
      template: './src/index.html',  //html模板路径
      inject: true,  //允许插件修改哪些内容，包括head与body
      hash: true,    //为静态资源生成hash值
      minify: {  //压缩HTML文件
        removeComments: true,  //移除HTML中的注释
        collapseWhitespace: true   //删除空白符与换行符
      }
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:4200'
    }),
    /* new HappyPack({
     id: 'ts',
     'awesome-typescript-loader',
     'angular2-template-loader',
     'angular2-router-loader'
     ],
     threadPool: happyThreadPool,
     cache: true,
     verbose: true
     }),*/
    /*   new HappyPack({

     id: 'css',

     loaders: ['to-string-loader', 'style-loader', 'css-loader'],

     threadPool: happyThreadPool,

     cache: true,

     verbose: true

     }),

     new HappyPack({

     id: 'sass',

     loaders: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader'],

     threadPool: happyThreadPool,

     cache: true,

     verbose: true

     }),

     new HappyPack({

     id: 'jpg',

     loaders: ['file-loader?name=assets/img/[name].[hash].[ext]'], //保证文件名相同

     threadPool: happyThreadPool,

     cache: true,

     verbose: true

     }),*/

    /*new webpack.DllReferencePlugin({

     context: path.join(__dirname, "../"),

     manifest: require("../dll/dll-manifest.json")

     })*/

  ],

  node: {

    global: true,

    crypto: 'empty',

    __dirname: true,

    __filename: true,

    process: true,

    Buffer: false,

    clearImmediate: false,

    setImmediate: false

  }

};

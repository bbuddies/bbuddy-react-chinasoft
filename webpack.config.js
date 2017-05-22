var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (dev) {
  var config = {
    devtool: dev ? 'eval-source-map' : 'source-map',
    entry: {
      app: ['./app/index'],
      vendor: [
        'history',
        'whatwg-fetch',
        'material-ui',
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'react-tap-event-plugin',
        'redux',
        'redux-logger',
        'redux-router',
        'redux-thunk'
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss"]
    },
    devServer: {
      stats: {
        chunks: false,
        colors: true
      },
      contentBase: './www/',  //Relative directory for base of server
      hot: dev,
      inline: true,
      port: 8100        //Port Number
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: dev ? '[name].js' : '[name].[hash].js',
      publicPath: dev ? '/' : '/'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: dev ? 'vendor.js' : 'vendor.[hash].js'}),
      new ExtractTextPlugin(dev ? '[name].css' : '[name].[hash].css'),
      new HtmlWebpackPlugin({
        template: './www/index.html',
        inject: 'body'
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }]
    }
  }
  if (dev) {
    config.entry.app.unshift('react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8100', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.plugins.push(new webpack.NamedModulesPlugin())
  } else {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          // This has effect on the react lib size
          "NODE_ENV": JSON.stringify("production")
        }
      })
    )
    config.plugins.push(new webpack.optimize.DedupePlugin())
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    )
  }
  return config
}


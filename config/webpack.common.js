const webpack = require('webpack');
const helpers = require('./helpers');
/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
// const HtmlElementsPlugin = require('./html-elements-plugin');

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'Fxtech sign',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

let config = {
  metadata: METADATA,
  entry: {
    app: ['./src/app/entry.js']
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json'],

    // Make sure root is src
    root: helpers.root('src'),
    // remove other default values
    modulesDirectories: ['node_modules']

  },

  module: {
    preLoaders: [

    ],

    loaders: [
      {
        test: /\.js|\.jsx$/,
        loaders: ['babel?cacheDirectory=true'],
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        // loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      // {test: /\.(jpe?g|png|gif|svg)$/i, loader:'url'}
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10240'
      },
      {
        test: /\.(gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=50000'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=50000'
      },

      // { test: /\.scss/, loader: 'style-loader!css-loader!sass-loader' },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  postcss: () => {
    return [autoprefixer({
      // browsers: ['last 1 version, > 10%']
      // browsers: ['Firefox > 20, ie >= 9, Chrome > 36']
    }), precss];
  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.OccurenceOrderPlugin(true),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['polyfills', 'vendor'].reverse()
    // }),

    // new CopyWebpackPlugin([{
    //   from: 'src/assets',
    //   to: 'assets'
    // }]),

    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency',
      inject: 'body'
    })
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};

module.exports = config;

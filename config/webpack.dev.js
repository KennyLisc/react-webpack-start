let webpack = require('webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
let commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlDllPlugin = require('./html-dll-plugin');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  port: 3000,
  ENV,
  HMR
});

if (true || HMR) {
   // commonConfig.entry.app.unshift('webpack-hot-middleware/client?reload=false');
   commonConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', 'react-hot-loader/patch');
}

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,
  debug: true,
  devtool: 'cheap-module-source-map',
  output: {
    publicPath: '/',
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',

    library: 'ac_[name]',
    libraryTarget: 'var'
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('.././manifest/dev/vendor-manifest.json'),
      sourceType: 'var'
    }),

    new CopyWebpackPlugin([{
      flatten: true,
      from: helpers.root('manifest/dev/*.js'),
      to: ''
    }]),

    new HtmlDllPlugin({ dllJson: require('.././manifest/dev/webpack-assets.json') }),

    new webpack.HotModuleReplacementPlugin(),

    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR
      }
    })
  ],
  // ,
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    hot: true,
    outputPath: helpers.root('dist')
  }
  // ,
  // node: {
  //   global: 'window',
  //   crypto: 'empty',
  //   process: true,
  //   module: false,
  //   clearImmediate: false,
  //   setImmediate: false
  // }

});

const helpers = require('./helpers');
let webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

let subFolder = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

let config = {
  entry: {
    vendor_dll: ['./src/vendor.js']
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/,
        loaders: ['babel?cacheDirectory=true'],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: helpers.root('manifest', subFolder),
    filename: '[name].js',
    library: '[name]_[hash]', // 和DllPlugin的name对应
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.DllPlugin({
      path: helpers.root('manifest', subFolder, 'vendor-manifest.json'),
      name: '[name]_[hash]'
    }),

    new AssetsPlugin({
      pretty: true,
      path: helpers.root('manifest', subFolder),
      update: true
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name].[hash].js';
  config.output.path = helpers.root('manifest/prod');
  config.plugins = config.plugins.concat(
    [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true
        },
        output: { comments: false }
      }),

      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin
    ]
  );
} else {
  config.plugins = config.plugins.concat(
    [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  );
}
console.log(process.env.NODE_ENV || 'dev');
module.exports = config;

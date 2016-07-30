let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./config/webpack.dev');

process.env.progress = true;
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  colors: true,
  compress: true,
  quiet: false,
  noInfo: false,
  stats: {
    colors: true,
    progress: true,
    errorDetails: true
    // chunks: false,
  }
}).listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at http://localhost:3000/');
});


    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    // proxy: {
    //   "*": "http://localhost:9090"
    // },

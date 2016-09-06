var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};
var common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: PATHS.app
    }, {
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: PATHS.app
    }]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: process.env.HOST,
      port: process.env.PORT
    },
    devtool: 'eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true
      })
    ]
  });
}
if (TARGET === 'build') {
  module.exports = merge(common, {});
}

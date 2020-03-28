const merge = require('webpack-merge');
const path = require('path');

const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: {
    makeHtml: [
      path.resolve(process.env.SRC_PATH, 'server/makeHtml.tsx'),
    ],
  },
  mode: 'production',
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'makeHtml.bundle.js',
    libraryTarget: 'commonjs2',
    path: process.env.BUILD_PATH,
    publicPath: '/',
  },
  plugins: [
  ],
  target: 'node',
};

module.exports = merge(webpackConfigClientWeb, config);

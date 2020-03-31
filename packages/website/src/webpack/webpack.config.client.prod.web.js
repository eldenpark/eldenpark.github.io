const merge = require('webpack-merge');
const path = require('path');

const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  entry: {
    client: path.resolve(process.env.WEBSITE_SRC_PATH, 'client/client.tsx'),
    react: ['react', 'react-dom'],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    chunkFilename: 'chunk.[chunkhash].js',
    filename: '[name].[chunkhash].js',
    path: process.env.DIST_PATH,
    publicPath: '/g/',
  },
};

module.exports = merge(webpackConfigClientWeb, config);

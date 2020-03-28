const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(process.env.SRC_PATH, 'client/client.tsx'),
    ],
    react: ['react', 'react-dom'],
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/g/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = merge(webpackConfigClientWeb, config);

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelRc = require('../.babelrc');

module.exports = {
  context: __dirname,
  externals: {},
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelRc,
          },
        ],
      },
      {
        include: /node_modules/,
        test: /\.[jt]sx?$/,
        use: [ 'react-hot-loader/webpack' ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { 
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
            },
          },
        ],
      },  
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: [
      '.js', 
      '.jsx', 
      '.ts', 
      '.tsx',
    ],
  },
  target: 'web',
};

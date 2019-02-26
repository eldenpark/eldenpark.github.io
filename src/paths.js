const path = require('path');

const ROOT_PATH = process.cwd();
const WEBPACK_PATH = path.resolve(ROOT_PATH, 'internals/webpack');

module.exports = {
  data: path.resolve(ROOT_PATH, 'data'),
  dist: path.resolve(ROOT_PATH, 'dist'),
  distEject: path.resolve(ROOT_PATH, 'eject'),
  distPublicBundle: path.resolve(ROOT_PATH, 'dist/bundle'),
  distUniversal: path.resolve(ROOT_PATH, 'dist/universal'),
  src: path.resolve(ROOT_PATH, 'src'),
  webpackConfigClientLocalWeb: path.resolve(WEBPACK_PATH, 'webpack.config.client.local.web'),
  webpackConfigClientProdWeb: path.resolve(WEBPACK_PATH, 'webpack.config.client.prod.web'),
  webpackConfigUniversalLocal: path.resolve(WEBPACK_PATH, 'webpack.config.universal.local'),
  webpackConfigUniversalProd: path.resolve(WEBPACK_PATH, 'webpack.config.universal.prod'),
};

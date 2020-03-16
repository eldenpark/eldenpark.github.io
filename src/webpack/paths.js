const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../..');

module.exports = {
  build: path.resolve(ROOT_PATH, 'build'),
  docs: path.resolve(ROOT_PATH, 'docs'),
  root: ROOT_PATH,
  src: path.resolve(ROOT_PATH, 'src'),
};

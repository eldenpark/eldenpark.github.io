const path = require('path');
const { logger } = require('jege/server');

const log = logger('[eldeni.github.io]');

const ROOT_PATH = (function requireProjectRoot() {
  const parent = path.resolve(__dirname, '..');
  const cwd = process.cwd();

  if (parent !== cwd) {
    log('requireProjectRoot(): cwd may not be the project root. cwd: %s, parent of paths.js: %s', cwd, parent);
    throw new Error('cwd must be the project root');
  }

  return cwd;
})();

module.exports = {
  build: path.resolve(ROOT_PATH, '.build'),
  data: path.resolve(ROOT_PATH, 'data'),
  dist: path.resolve(ROOT_PATH, 'g'),
  root: ROOT_PATH,
  src: path.resolve(ROOT_PATH, 'src'),
};

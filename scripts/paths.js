const fs = require('fs');
const path = require('path');

const ROOT_PATH = (function requireProjectRoot() {
  const root = path.resolve(__dirname, '..');

  let pJson = false;
  let gitPath = false;
  fs.readdirSync(root)
    .forEach((file) => {
      if (file === '.git') {
        gitPath = true;
      }
      if (file === 'package.json') {
        pJson = true;
      }
    });
  if (!pJson || !gitPath) {
    throw new Error('cwd is wrong configured. Please run the command in the root directory');
  }
  return root;
})();

module.exports = {
  build: path.resolve(ROOT_PATH, '.build'),
  dist: path.resolve(ROOT_PATH, 'g'),
  root: ROOT_PATH,
  src: path.resolve(ROOT_PATH, 'src'),
};

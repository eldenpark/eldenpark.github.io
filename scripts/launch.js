const { argv } = require('yargs');
const { logger } = require('jege/server');
const path = require('path');

const babelRc = require('./.babelrc');
const { gulp } = require('./build');

const log = logger('[eldeni.github.io]');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

function launch() {
  process.env.DATA_PATH = path.resolve(__dirname, '../data/data-1.ts');

  log('launch(): argv: %j, DATA_PATH: %s', argv, process.env.DATA_PATH);

  if (process.env.NODE_ENV === 'production') {
    const buildTask = gulp.task('build');
    buildTask(() => {
      const serverProd = require('../src/server/index.production').default;
      serverProd();
    });
  } else {
    const buildDevTask = gulp.task('build-dev');
    buildDevTask(() => {
      log('launch(): build finished. launching...');
      const server = require('../src/server/index.local').default;
      server();
    });
  }
}

if (require.main === module) {
  launch();
}

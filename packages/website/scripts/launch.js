const { argv } = require('yargs');
const { logger } = require('jege/server');

const babelRc = require('./.babelrc');
const { gulp } = require('./build');

const log = logger('[website]');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

function launch() {
  log('launch(): argv: %j', argv);

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

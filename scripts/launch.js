/* eslint-disable import/no-extraneous-dependencies */
const { argv } = require('yargs');
const { logger } = require('jege/server');
const path = require('path');

const babelRc = require('./.babelrc');
// const { gulp } = require('./build');

const log = logger('[eldeni.github.io]');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

const server = require('../src/server/index.local').default;

function launch() {
  log('launch(): argv: %j', argv);

  process.env.DATA_PATH = path.resolve(__dirname, '../data/data-1.ts');

  // const buildDevTask = gulp.task('build-dev');
  // buildDevTask(() => {
  //   log('launch(): build finished. launching...');
  // });

  server();
}

if (require.main === module) {
  launch();
}

const { argv } = require('yargs');
const childProcess = require('child_process');
const { logger } = require('jege/server');
const path = require('path');

const babelRc = require('./.babelrc');
const { gulp } = require('./build');
const pJson = require('../package.json');

const log = logger('[eldeni.github.io]');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

const latestCommitHash = (function getLastetCommitHash() {
  return childProcess.execSync(`git log --pretty=format:'%h' -n 1`).toString();
})();

function launch() {
  process.env.DATA_PATH = path.resolve(__dirname, '../data');
  process.env.DATA_FILE_PATH = path.resolve(__dirname, '../data/data.ts');
  process.env.LATEST_COMMIT_HASH = latestCommitHash;
  process.env.HARDCODED_STATIC_URL = 'https://eldeni.github.io';
  process.env.REPOSITORY_URL = pJson.repository.url;

  log(
    'launch(): argv: %j, DATA_PATH: %s, DATA_FILE_PATH: %s, LATEST_COMMIT_HASH: %s',
    argv,
    process.env.DATA_PATH,
    process.env.DATA_FILE_PATH,
    process.env.LATEST_COMMIT_HASH,
  );

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

const childProcess = require('child_process');
const { logger } = require('jege/server');
const path = require('path');

const paths = require('./paths');
const pJson = require('../package.json');

const log = logger('[eldeni.github.io]');

const latestCommitHash = (function getLastetCommitHash() {
  return childProcess.execSync(`git log --pretty=format:'%h' -n 1`).toString();
})();

exports.apply = function apply() {
  const processEnv = {
    BUILD_PATH: paths.build,
    DATA_FILE_PATH: path.resolve(__dirname, '../data/data.ts'),
    DATA_PATH: path.resolve(__dirname, '../data'),
    DIST_PATH: paths.dist,
    HARDCODED_STATIC_URL: 'https://eldeni.github.io',
    LATEST_COMMIT_HASH: latestCommitHash,
    REPOSITORY_URL: pJson.repository.url,
    ROOT_PATH: paths.root,
    SRC_PATH: paths.src,
  };

  process.env = {
    ...process.env,
    ...processEnv,
  };

  let envString = '';
  Object.keys(processEnv)
    .forEach((envKey) => {
      envString += `${envKey}: ${process.env[envKey]}, `;
    });
  log('env.apply(): %s', envString);
};

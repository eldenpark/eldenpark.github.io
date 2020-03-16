const { buildLogger } = require('jege/server');
const chalk = require('chalk');
const { compile } = require('express-isomorphic-extension/webpack');
const del = require('del');
const gulp = require('gulp');
const path = require('path');

const babelRc = require('./.babelRc');
const webpackConfigClient = require('../src/webpack/webpack.config.client.prod.web');
const webpackConfigServer = require('../src/webpack/webpack.config.server.prod');

const buildLog = buildLogger('[eldeni.github.io]');

const paths = {
  build: path.resolve(__dirname, '../build'),
  docs: path.resolve(__dirname, '../docs'),
  src: path.resolve(__dirname, '../src'),
};

gulp.task('clean', () => {
  const cleanPaths = [
    `${paths.build}/**/*`,
    `${paths.docs}/**/*`,
  ];

  buildLog('clean', 'cleanPaths: %j', cleanPaths);

  return del(cleanPaths);
});

gulp.task('copy-public', () => {
  const publicPath = path.resolve(paths.src, 'public');
  buildLog('copy-public', 'src: %s, docs: %s', publicPath, paths.docs);

  return gulp.src(`${publicPath}/**/*`)
    .pipe(gulp.dest(paths.docs));
});

gulp.task('webpack-client', () => {
  const buildJsonPath = path.resolve(paths.docs, 'build.json');
  buildLog('webpack-client', 'buildJsonPath: %s', buildJsonPath);

  return compile({
    buildJsonPath,
    webpackConfig: webpackConfigClient,
  })
    .then((result) => {
      buildLog('webpack-client', `${chalk.green('success')}: %j`, result);
    })
    .catch((err) => {
      buildLog('webpack-client', `${chalk.red('error')}: %o`, err);
      throw err;
    });
});

gulp.task('webpack-makeHtml', () => {
  buildLog('webpack-makeHtml', 'start comilling');

  return compile({
    webpackConfig: webpackConfigServer,
  })
    .then((result) => {
      buildLog(`webpack-makehtml`, `${chalk.green('success')}: %j`, result);
    })
    .catch((err) => {
      buildLog('webpack-makehtml', `${chalk.red('error')}: %o`, err);
      throw err;
    });
});

gulp.task('build', gulp.series('clean', 'copy-public', 'webpack-client', 'webpack-makeHtml'));

gulp.task('build-dev', gulp.series('clean', 'copy-public'));

function build(callback) {
  require('@babel/register')({
    ...babelRc,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  });

  const buildTask = gulp.task('build');
  buildTask(callback);
}

module.exports = {
  build,
  gulp,
};

if (require.main === module) {
  build();
}

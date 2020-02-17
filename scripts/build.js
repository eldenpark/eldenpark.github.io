/* eslint-disable import/no-extraneous-dependencies */
const { buildLogger } = require('jege/server');
const chalk = require('chalk');
const { compile } = require('express-isomorphic-extension/webpack');
const del = require('del');
// const fs = require('fs');
const gulp = require('gulp');
const path = require('path');

const babelRc = require('./.babelRc');
const webpackConfigClient = require('../src/webpack/webpack.config.client.prod.web');
const webpackConfigServer = require('../src/webpack/webpack.config.server.prod');

const buildLog = buildLogger('[eldeni.github.io]');

const paths = {
  assets: path.resolve(__dirname, '../dist/assets'),
  build: path.resolve(__dirname, '../build'),
  dist: path.resolve(__dirname, '../dist'),
  src: path.resolve(__dirname, '../src'),
};

gulp.task('clean', () => {
  buildLog('clean', 'distPath: %s', paths.dist);

  return del([
    `${paths.build}/**/*`,
    `${paths.dist}/**/*`,
  ]);
});

gulp.task('copy-public', () => {
  const publicPath = path.resolve(paths.src, 'public');
  buildLog('copy-public', 'srcPath: %s, dist: %s', publicPath, paths.dist);

  return gulp.src(`${publicPath}/**/*`)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('webpack-client', () => {
  const buildJsonPath = path.resolve(paths.dist, 'build.json');
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

// gulp.task('compile-scss', () => {
//   try {
//     fs.mkdirSync(paths.assets, { recursive: true });

//     const indexScssPath = path.resolve(paths.src, 'resources/scss/index.scss');
//     const cssFileName = 'index.css';
//     const indexCssPath = path.resolve(paths.assets, cssFileName);

//     log('compile-scss', 'indexScssPath: %s, indexCssPath: %s', indexScssPath, indexCssPath);

//     return new Promise((resolve) => {
//       sass.render({
//         file: indexScssPath,
//         outputStyle: 'compressed',
//       }, (err, { css }) => {
//         fs.writeFileSync(indexCssPath, css.toString('utf-8'));
//         resolve(cssFileName);
//       });
//     });
//   } catch (err) {
//     log('compile-scss', 'error occurred: %o', err);
//     throw err;
//   }
// });

// gulp.task('build-dev', gulp.series('clean', 'copy-public', 'compile-scss'));
gulp.task('build', gulp.series('clean', 'webpack-client', 'webpack-makeHtml'));

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

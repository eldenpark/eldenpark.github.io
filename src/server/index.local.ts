import chalk from 'chalk';
import express, {
} from 'express';
import ExpressIsomorphic, {
  Extend,
} from 'express-isomorphic';
import http from 'http';
import { logger } from 'jege/server';
import path from 'path';
import {
  watch,
  withWebpackDev,
} from 'express-isomorphic-extension/webpack';

import getData from './getData';
import IsomorphicState from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.local.web';
import webpackConfigServer from '../webpack/webpack.config.server.local';

const log = logger('[eldeni.github.io]');

const extend: Extend<IsomorphicState> = async (app, serverState) => {
  const {
    blogData,
    contentData,
    latestCommitHash,
    repositoryUrl,
  } = getData();

  app.use(webpackConfig.output.publicPath, express.static(process.env.DIST_PATH));

  withWebpackDev({
    serverState,
    webpackConfig,
  })(app);

  serverState.update(() => ({
    blogData,
    builtAt: Date.now(),
    contentData,
    latestCommitHash,
    publicPath: webpackConfig.output.publicPath,
    repositoryUrl,
  }));

  return watch(webpackConfigServer);
};

export default async function local() {
  log(
    'local(): Starting, NODE_ENV: %s, BUILD_PATH: %s, DIST_PATH: %s',
    process.env.NODE_ENV,
    process.env.BUILD_PATH,
    process.env.DIST_PATH,
  );

  const processEnv = process.env;
  if (!processEnv.BUILD_PATH || !processEnv.DATA_PATH) {
    throw new Error('env variable is wrong');
  }

  const port = process.env.PORT || 3001;
  const { app, serverState } = await ExpressIsomorphic.createDev({
    extend,
    makeHtmlPath: path.resolve(processEnv.BUILD_PATH, 'makeHtml.bundle.js'),
    watchExt: 'js,jsx,ts,tsx,html,test,md',
    watchPaths: [
      processEnv.DATA_PATH,
    ],
  });

  serverState.on('change', () => {
    try {
      log('on change: serverState changed, delete cache: %s', process.env.DATA_FILE_PATH);
      delete require.cache[process.env.DATA_FILE_PATH!];

      const {
        blogData,
        contentData,
      } = getData();

      serverState.update(() => ({
        blogData,
        contentData,
      }));
    } catch (err) {
      log('on change: error loading module: %s', process.env.DATA_FILE_PATH);
    }
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    log(`local(): server is listening on: ${chalk.yellow('%s')}`, port);
  });
}

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
  const contentDataPath = path.resolve(process.env.WEBSITE_DATA_PATH!, 'data.ts');
  log(
    'local(): Starting, NODE_ENV: %s, BUILD_PATH: %s, DIST_PATH: %s, contentDataPath: %s',
    process.env.NODE_ENV,
    process.env.BUILD_PATH,
    process.env.DIST_PATH,
    contentDataPath,
  );

  const processEnv = process.env;
  if (!processEnv.WEBSITE_BUILD_PATH || !processEnv.WEBSITE_DATA_PATH) {
    throw new Error('env variable, either buildPath or dataPath is wrong');
  }

  const port = process.env.PORT || 3001;
  const { app, serverState } = await ExpressIsomorphic.createDev({
    extend,
    makeHtmlPath: path.resolve(processEnv.WEBSITE_BUILD_PATH, 'makeHtml.bundle.js'),
    watchExt: 'js,jsx,ts,tsx,html,test,md',
    watchPaths: [
      processEnv.WEBSITE_DATA_PATH,
    ],
  });

  serverState.on('change', () => {
    try {
      log('on change: serverState changed, delete cache: %s', contentDataPath);
      delete require.cache[contentDataPath!];

      const {
        blogData,
        contentData,
      } = getData();

      serverState.update(() => ({
        blogData,
        contentData,
      }));
    } catch (err) {
      log('on change: error loading module: %s', contentDataPath);
    }
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    log(`local(): server is listening on: ${chalk.yellow('%s')}`, port);
  });
}

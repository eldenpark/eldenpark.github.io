import chalk from 'chalk';
import express, {
  NextFunction,
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

import IsomorphicState from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.local.web';
import webpackConfigServer from '../webpack/webpack.config.server.local';

const log = logger('[eldeni.github.io]');

const paths = {
  build: path.resolve(__dirname, '../../build'),
  data: path.resolve(__dirname, '../../data'),
  docs: path.resolve(__dirname, '../../docs'),
};

const extend: Extend<IsomorphicState> = async (app, serverState) => {
  const dataPath = process.env.DATA_PATH as string;
  let contentData;
  try {
    contentData = require(dataPath).default;
  } catch (err) {
    log(`local(): ${chalk.yellow('warn')} process.env.ENV.dataPath is not a valid path`);
    throw new Error('dataPath is not a valid path');
  }

  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  app.use(express.static(paths.docs));

  withWebpackDev({
    serverState,
    webpackConfig,
  })(app);

  serverState.update(() => ({
    contentData,
    publicPath: webpackConfig.output.publicPath,
  }));

  return watch(webpackConfigServer);
};

export default async function local() {
  log('local(): Starting, ENV: %j', process.env.ENV);

  const port = process.env.PORT || 3001;
  const { app, serverState } = await ExpressIsomorphic.createDev({
    extend,
    makeHtmlPath: path.resolve(paths.build, 'makeHtml.bundle.js'),
    watchExt: 'js,jsx,ts,tsx,html,test',
    watchPaths: [
      paths.data,
    ],
  });

  serverState.on('change', () => {
    try {
      delete require.cache[process.env.DATA_PATH!];
      const contentData = require(process.env.DATA_PATH!).default;

      serverState.update(() => ({
        contentData,
      }));
    } catch (err) {
      log('on change: error loading module: %s', process.env.DATA_PATH);
    }
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    log(`local(): server is listening on: ${chalk.yellow('%s')}`, port);
  });
}

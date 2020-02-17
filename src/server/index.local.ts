import chalk from 'chalk';
import express, {
  NextFunction,
} from 'express';
import ExpressIsomorphic, {
  Extend,
} from 'express-isomorphic';
import fs from 'fs';
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
  dist: path.resolve(__dirname, '../../dist'),
  public: path.resolve(__dirname, '../../dist/public'),
};

const extend: Extend<IsomorphicState> = async (app, serverState) => {
  const dataPath = process.env.DATA_PATH as string;
  if (!fs.existsSync(dataPath)) {
    log(`local(): ${chalk.yellow('warn')} process.env.ENV.dataPath is not a valid path`);
    throw new Error('dataPath is not a valid path');
  }

  const contentData = require(dataPath).default;

  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  app.use(express.static(paths.public));

  withWebpackDev({
    serverState,
    webpackConfig,
  })(app);

  serverState.update((object) => ({
    ...object,
    state: {
      ...object.state,
      contentData: JSON.stringify(contentData),
      publicPath: webpackConfig.output.publicPath,
    },
  }));

  return watch(webpackConfigServer);
};

export default async function local() {
  log('local(): Starting, ENV: %j', process.env.ENV);

  const port = process.env.PORT || 5001;
  const { app } = await ExpressIsomorphic.createDev({
    extend,
    makeHtmlPath: path.resolve(paths.dist, 'makeHtml.bundle.js'),
    watchExt: 'js,jsx,ts,tsx,html,test',
    watchPaths: [
      paths.data,
    ],
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    log(`local(): server is listening on: ${chalk.yellow('%s')}`, port);
  });
}

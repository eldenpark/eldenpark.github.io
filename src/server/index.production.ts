import chalk from 'chalk';
import express, {
  NextFunction,
  Request,
} from 'express';
import ExpressIsomorphic, {
  Extend,
} from 'express-isomorphic';
import http from 'http';
import { logger } from 'jege/server';
import path from 'path';
import { withWebpack } from 'express-isomorphic-extension/webpack';

import IsomorphicState from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.prod.web';

const webpackBuild = require('../../docs/build.json');

const log = logger('[eldeni.github.io]');

const paths = {
  build: path.resolve(__dirname, '../../build'),
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

  withWebpack({
    serverState,
    webpackBuild,
  })(app);

  const { path: outputPath, publicPath } = webpackConfig.output;

  app.use('/', express.static(outputPath));

  return Promise.all([])
    .then(() => {
      serverState.update(() => ({
        contentData,
        publicPath,
      }));
    });
};

export default async function main() {
  const { app, eject } = await ExpressIsomorphic.create({
    extend,
    makeHtmlPath: path.resolve(paths.build, 'makeHtml.bundle.js'),
  });

  const port = 6001;

  const httpServer = http.createServer(app);

  httpServer.listen(port, () => {
    log('productionServer listening on: %s', port);
  });

  await eject({
    filePath: path.resolve(paths.docs, 'index.html'),
    requestUrl: `http://localhost:${port}/`,
  });

  await eject({
    filePath: path.resolve(paths.docs, 'projects.html'),
    requestUrl: `http://localhost:${port}/projects.html`,
  });

  await eject({
    filePath: path.resolve(paths.docs, 'music.html'),
    requestUrl: `http://localhost:${port}/music.html`,
  });
}

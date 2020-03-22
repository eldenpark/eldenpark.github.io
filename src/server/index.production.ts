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

import getData from './getData';
import IsomorphicState from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.prod.web';

const webpackBuild = require('../../g/build.json');

const log = logger('[eldeni.github.io]');

const paths = {
  build: path.resolve(__dirname, '../../build'),
  dist: path.resolve(__dirname, '../../g'),
  root: path.resolve(__dirname, '../../'),
};

const extend: Extend<IsomorphicState> = async (app, serverState) => {
  const {
    blogData,
    contentData,
    latestCommitHash,
  } = getData();

  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  withWebpack({
    serverState,
    webpackBuild,
  })(app);

  const { path: outputPath, publicPath } = webpackConfig.output;

  app.use(publicPath, express.static(outputPath));

  return Promise.all([])
    .then(() => {
      serverState.update(() => ({
        blogData,
        builtAt: webpackBuild.builtAt,
        contentData,
        latestCommitHash,
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
    filePath: path.resolve(paths.root, 'index.html'),
    requestUrl: `http://localhost:${port}/`,
  });

  await eject({
    filePath: path.resolve(paths.dist, 'projects.html'),
    requestUrl: `http://localhost:${port}/projects.html`,
  });

  await eject({
    filePath: path.resolve(paths.dist, 'music.html'),
    requestUrl: `http://localhost:${port}/music.html`,
  });
}

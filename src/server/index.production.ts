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
      serverState.update((object) => ({
        ...object,
        state: {
          ...object.state,
          publicPath,
        },
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

  const filePath = path.resolve(paths.docs, 'index.html');
  await eject({
    filePath,
    requestUrl: `http://localhost:${port}/`,
  });
}

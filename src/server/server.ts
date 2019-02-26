import ExpressIsomorphic from '@nodekit/express-isomorphic';
import http from 'http';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import path from 'path';

import * as paths from '../paths';
import makeHtml from './makeHtml';

const env = process.env.NODE_ENV;

function extend(app, state) {
  console.log('extend()');

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('middleware: extend');
    next();
  });
}

const { localServer, eject } = ExpressIsomorphic.create({
  extend,
  makeHtml,
  publicPath: paths.dist,
  serverDistPath: paths.dist,
  universalAppPath: path.resolve(paths.distUniversal, 'universal.rootContainer.js'),
  webpackBuildJsonPath: path.resolve(paths.distPublicBundle, 'build.json'),
  webpackConfigClientLocalPath: paths.webpackConfigClientLocalWeb,
  webpackConfigUniversalLocalPath: paths.webpackConfigUniversalLocal,
});

if (env !== 'production') {
  const port = 6234;

  const httpServer = http.createServer(localServer().app);

  httpServer.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
} else {
  eject({
    ejectPath: paths.distEject,
  });
}



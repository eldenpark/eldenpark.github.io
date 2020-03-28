import express from 'express';
import ExpressIsomorphic, {
  Extend,
} from 'express-isomorphic';
import fs from 'fs';
import http from 'http';
import { logger } from 'jege/server';
import path from 'path';
import { withWebpack } from 'express-isomorphic-extension/webpack';

import getData from './getData';
import IsomorphicState from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.prod.web';

const webpackBuild = require('../../g/build.json');

const log = logger('[eldeni.github.io]');

const extend: Extend<IsomorphicState> = async (app, serverState) => {
  const {
    blogData,
    contentData,
    createdFiles,
    latestCommitHash,
    repositoryUrl,
  } = getData();

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
        createdFiles,
        latestCommitHash,
        publicPath,
        repositoryUrl,
      }));
    });
};

export default async function main() {
  log(
    'local(): Starting, NODE_ENV: %s, BUILD_PATH: %s, DIST_PATH: %s',
    process.env.NODE_ENV,
    process.env.BUILD_PATH,
    process.env.DIST_PATH,
  );

  const processEnv = process.env;
  if (!processEnv.BUILD_PATH || !processEnv.DATA_PATH || !processEnv.DIST_PATH) {
    throw new Error('env variable is wrong');
  }

  const { app, eject, serverState } = await ExpressIsomorphic.create({
    extend,
    makeHtmlPath: path.resolve(processEnv.BUILD_PATH, 'makeHtml.bundle.js'),
  });

  const port = 6001;

  const httpServer = http.createServer(app);

  httpServer.listen(port, () => {
    log('productionServer listening on: %s', port);
  });

  const { createdFiles } = serverState.state;
  await ejectFiles(eject, port, createdFiles);
}

async function ejectFiles(eject, port, createdFiles) {
  createdFiles.map(async (file) => {
    const directoryPath = path.resolve(process.env.DIST_PATH!, file.category);
    if (!fs.existsSync(directoryPath)) {
      log('ejectFiles(): creating directory: %s', directoryPath);
      fs.mkdirSync(directoryPath);
    }
  });

  const processEnv = process.env;

  await eject({
    filePath: path.resolve(processEnv.ROOT_PATH!, 'index.html'),
    requestUrl: `http://localhost:${port}/`,
  });

  await eject({
    filePath: path.resolve(processEnv.DIST_PATH!, 'projects.html'),
    requestUrl: `http://localhost:${port}/g/projects.html`,
  });

  await eject({
    filePath: path.resolve(processEnv.DIST_PATH!, 'music.html'),
    requestUrl: `http://localhost:${port}/g/music.html`,
  });

  createdFiles.map(async (file) => {
    await eject({
      filePath: path.resolve(processEnv.DIST_PATH!, file.category, file.fileName),
      requestUrl: `http://localhost:${port}/g/${file.category}/${file.fileName}`,
    });
  });
}

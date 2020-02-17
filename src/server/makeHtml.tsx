import {
  createAssetElements,
  createStringifiableObjectElement,
} from 'express-isomorphic/utils';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { logger } from 'jege/server';
import { MakeHtml } from 'express-isomorphic';
import React from 'react';
import { renderToString } from 'react-dom/server';

import IsomorphicState from './IsomorphicState';
import ServerApp from '@@src/server/ServerApp';

const log = logger('[eldeni.github.io]');

const makeHtml: MakeHtml<IsomorphicState> = async ({
  serverState,
}) => {
  log('makeHtml()');

  const { socketPath, socketPort, state } = serverState;
  const {
    assets,
    publicPath,
  } = state;

  const reactAssetElements = createAssetElements(assets, publicPath);
  const processEnvElement = createStringifiableObjectElement('__NODE_ENV__', getProcessEnv('NODE_ENV'));
  const { contentData } = serverState.state;

  const element = (
    <ServerApp />
  );
  const reactAppInString = await renderToString(element);

  const html = template({
    contentData,
    fontAwesomeCss: dom.css(),
    processEnvElement,
    reactAppInString,
    reactAssetElements,
    socketPath,
    socketPort,
  });
  return html;
};

function template({
  contentData,
  fontAwesomeCss,
  processEnvElement,
  reactAppInString,
  reactAssetElements,
  socketPath,
  socketPort,
}) {
  return `
<html>
  <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono&display=swap" rel="stylesheet">
    <style>${fontAwesomeCss}</style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
    <script>window['DATA']=${contentData}</script>
    ${processEnvElement}
  </head>
  <div id="react-root">${reactAppInString}</div>
  ${reactAssetElements}
  <script>
    if (window.io) {
      var socket = io('http://localhost:${socketPort}', {
        path: '${socketPath}'
      });
      socket.on('express-isomorphic', function ({ msg }) {
        console.warn('[express-isomorphic] %s', msg);
      });
    }
  </script>
</html>
`;
}

function getProcessEnv(prefix) {
  if (prefix === undefined || prefix.length < 1) {
    throw new Error('getProcessEnv(): prefix is not defined');
  }

  const env = {};
  Object.keys(process.env)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => {
      env[key] = process.env[key];
    });
  return env;
}

export default makeHtml;

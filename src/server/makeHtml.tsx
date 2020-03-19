import {
  createAssetElements,
  createStringifiableObjectElement,
} from 'express-isomorphic/utils';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { logger } from 'jege/server';
import { MakeHtml } from 'express-isomorphic';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import IsomorphicState from './IsomorphicState';
import ServerApp from '@@src/server/ServerApp';

const isProd = process.env.NODE_ENV === 'production';

const log = logger('[eldeni.github.io]');

const makeHtml: MakeHtml<IsomorphicState> = async ({
  requestUrl,
  serverState,
}) => {
  log('makeHtml()');

  const { socketPath, socketPort, state } = serverState;
  const {
    assets,
    publicPath,
  } = state;
  const serverStyleSheet = new ServerStyleSheet();

  const reactAssetElements = createAssetElements(assets, publicPath);
  const processEnvElement = createStringifiableObjectElement('__NODE_ENV__', getProcessEnv('NODE_ENV'));
  const { builtAt, contentData } = serverState.state;
  const isomorphicData = {
    builtAt,
    contentData,
  };

  const element = (
    <ServerApp
      isomorphicData={isomorphicData}
      requestUrl={requestUrl}
      serverStyleSheet={serverStyleSheet}
    />
  );
  const reactAppInString = await renderToString(element);

  const styleTags = serverStyleSheet.getStyleTags();

  const html = template({
    fontAwesomeCss: dom.css(),
    isomorphicData,
    processEnvElement,
    reactAppInString,
    reactAssetElements,
    socketPath,
    socketPort,
    styledComponentsStyleElements: styleTags,
  });
  return html;
};

function template({
  fontAwesomeCss,
  isomorphicData,
  processEnvElement,
  reactAppInString,
  reactAssetElements,
  socketPath,
  socketPort,
  styledComponentsStyleElements,
}) {
  return `
<html>
  <head>
    <title>Elden Park</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="/dist/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600,700|Work+Sans:400,500,700,800,900&display=swap" rel="stylesheet">
    <style>${fontAwesomeCss}</style>
    <script>window['ISOMORPHIC_DATA']=${JSON.stringify(isomorphicData)}</script>
    ${styledComponentsStyleElements}
    ${processEnvElement}
  </head>
  <div id="react-root">${reactAppInString}</div>
  ${reactAssetElements}
  ${socket(socketPort, socketPath)}
</html>
`;
}

function socket(socketPort, socketPath) {
  return isProd
    ? ''
    : `
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
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

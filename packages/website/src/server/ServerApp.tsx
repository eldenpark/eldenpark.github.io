import { logger } from 'jege/server';
import React from 'react';
import {
  StaticRouter,
} from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import { IsomorphicDataProvider } from '@@src/universal/contexts/IsomorphicDataContext';
import Universal from '@@src/universal/components/Universal';

const log = logger('[eldeni.github.io]');

const ServerApp = ({
  isomorphicData,
  requestUrl,
  serverStyleSheet,
  staticContext,
}) => {
  log('ServerApp(): isomorphicData: %j', isomorphicData);

  return (
    <StaticRouter
      context={staticContext}
      location={requestUrl}
    >
      <IsomorphicDataProvider data={isomorphicData}>
        <StyleSheetManager sheet={serverStyleSheet.instance}>
          <Universal />
        </StyleSheetManager>
      </IsomorphicDataProvider>
    </StaticRouter>
  );
};

export default ServerApp;

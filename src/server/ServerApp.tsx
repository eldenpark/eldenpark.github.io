import { logger } from 'jege/server';
import React from 'react';
import {
  StaticRouter,
} from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import { DataProvider } from '@@src/universal/contexts/dataContext';
import Universal from '@@src/universal/components/Universal';

const log = logger('[eldeni.github.io]');

const ServerApp = ({
  contentData,
  requestUrl,
  serverStyleSheet,
}) => {
  log('ServerApp(): contentData: %j', contentData);

  return (
    <StaticRouter location={requestUrl}>
      <DataProvider data={contentData}>
        <StyleSheetManager sheet={serverStyleSheet.instance}>
          <Universal />
        </StyleSheetManager>
      </DataProvider>
    </StaticRouter>
  );
};

export default ServerApp;

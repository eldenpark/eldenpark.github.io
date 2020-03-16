import { logger } from 'jege/server';
import React from 'react';
import { StyleSheetManager } from 'styled-components';

import DataProvider from '@@src/universal/components/DataProvider';
import Universal from '@@src/universal/components/Universal';

const log = logger('[eldeni.github.io]');

const ServerApp = ({
  contentData,
  serverStyleSheet,
}) => {
  log('ServerApp(): contentData: %j', contentData);

  return (
    <DataProvider data={contentData}>
      <StyleSheetManager sheet={serverStyleSheet.instance}>
        <Universal />
      </StyleSheetManager>
    </DataProvider>
  );
};

export default ServerApp;

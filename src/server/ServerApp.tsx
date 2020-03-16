import React from 'react';
import { StyleSheetManager } from 'styled-components';

import Universal from '@@src/universal/components/Universal';

const ServerApp = ({
  serverStyleSheet,
}) => {
  return (
    <StyleSheetManager sheet={serverStyleSheet.instance}>
      <Universal />
    </StyleSheetManager>
  );
};

export default ServerApp;

import { hot } from 'react-hot-loader';
import React from 'react';

import DataProvider from '@@src/universal/components/DataProvider';
import { log } from '@@src/universal/modules/Logger';
import Universal from '@@src/universal/components/Universal';

const ClientApp: React.FC<any> = () => {
  const data = window['CONTENT_DATA'];
  log('window.CONTENT_DATA: %o', data);

  return (
    <DataProvider data={data}>
      <Universal />
    </DataProvider>
  );
};

export default hot(module)(ClientApp);

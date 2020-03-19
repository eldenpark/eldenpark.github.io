import { hot } from 'react-hot-loader';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from '@@src/universal/contexts/dataContext';
import { log } from '@@src/universal/modules/Logger';
import Universal from '@@src/universal/components/Universal';

const ClientApp: React.FC<any> = () => {
  const data = window['CONTENT_DATA'];
  log('window.CONTENT_DATA: %o', data);

  return (
    <BrowserRouter>
      <DataProvider data={data}>
        <Universal />
      </DataProvider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);

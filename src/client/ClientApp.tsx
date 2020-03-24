import { hot } from 'react-hot-loader';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { IsomorphicDataProvider } from '@@src/universal/contexts/IsomorphicDataContext';
import { log } from '@@src/universal/modules/Logger';
import Universal from '@@src/universal/components/Universal';

const ClientApp: React.FC = () => {
  const isomorphicData = window['ISOMORPHIC_DATA'];
  log('window.ISOMORPHIC_DATA: %o', isomorphicData);

  return (
    <BrowserRouter>
      <IsomorphicDataProvider data={isomorphicData}>
        <Universal />
      </IsomorphicDataProvider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);

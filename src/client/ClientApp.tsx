import React from 'react';
import ReactDOM from 'react-dom';

import Universal from '@@src/universal/components/Universal';

const domElement = document.getElementById('react-root');

const ClientApp: React.FC<any> = () => {
  return (
    <Universal />
  );
};

ReactDOM.hydrate(
  <ClientApp />,
  domElement,
  () => {},
);

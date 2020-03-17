import React from 'react';

import { ContentData } from '@@data/ContentData'; // only for type inferencing, so no worries for its location being outside of 'src/'

const DataContext = React.createContext<ContentData | undefined>(undefined);

const DataProvider = ({
  children,
  data,
}) => {
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider as default };

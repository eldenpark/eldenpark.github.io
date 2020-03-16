import React from 'react';

const DataContext = React.createContext<object | undefined>(undefined);

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

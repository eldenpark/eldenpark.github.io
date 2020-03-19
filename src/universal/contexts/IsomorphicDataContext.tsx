import React from 'react';

import { ContentData } from '@@data/ContentData'; // only for type inferencing, so no worries for its location being outside of 'src/'

const IsomorphicDataContext = React.createContext<IsomorphicData | undefined>(undefined);

const IsomorphicDataProvider = ({
  children,
  data,
}) => {
  return (
    <IsomorphicDataContext.Provider value={data}>
      {children}
    </IsomorphicDataContext.Provider>
  );
};

const useIsomorphicData = () => React.useContext(IsomorphicDataContext);
const useContentData = () => React.useContext(IsomorphicDataContext)!.contentData;

export {
  IsomorphicDataProvider,
  useContentData,
  useIsomorphicData,
};

interface IsomorphicData {
  builtAt: number;
  contentData: ContentData;
}

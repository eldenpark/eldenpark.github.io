import React from 'react';

// only for type inferencing, so no worries for its location being outside of 'src/'
import { BlogData } from '@@data/BlogData';
import { ContentData } from '@@data/ContentData';

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
  blogData: BlogData;
  builtAt: number;
  contentData: ContentData;
  latestCommitHash: string;
}

import { WebpackServerState } from 'express-isomorphic-extension/webpack';

import { ContentData } from '@@data/ContentData';

export default class IsomorphicState implements WebpackServerState {
  assets: string[];
  buildHash: string;
  builtAt: number;
  contentData: ContentData;
  latestCommitHash: string;
  publicPath: string;
}

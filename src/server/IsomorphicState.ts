import { WebpackServerState } from 'express-isomorphic-extension/webpack';

import { ContentData } from '@@data/ContentData';

export default class IsomorphicState implements WebpackServerState {
  assets: string[];
  buildHash: string;
  contentData: ContentData;
  publicPath: string;
}

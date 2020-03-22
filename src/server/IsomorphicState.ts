import { WebpackServerState } from 'express-isomorphic-extension/webpack';

import { BlogData } from '@@data/BlogData';
import { ContentData } from '@@data/ContentData';

export default class IsomorphicState implements WebpackServerState {
  assets: string[];
  blogData: BlogData;
  buildHash: string;
  builtAt: number;
  contentData: ContentData;
  latestCommitHash: string;
  publicPath: string;
}

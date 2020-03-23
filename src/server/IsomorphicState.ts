import { WebpackServerState } from 'express-isomorphic-extension/webpack';

import { BlogData } from '@@data/BlogData';
import { ContentData } from '@@data/ContentData';
import { CreatedFile } from './getData';

export default class IsomorphicState implements WebpackServerState {
  assets: string[];
  blogData: BlogData;
  buildHash: string;
  builtAt: number;
  contentData: ContentData;
  createdFiles: CreatedFile[];
  latestCommitHash: string;
  publicPath: string;
}

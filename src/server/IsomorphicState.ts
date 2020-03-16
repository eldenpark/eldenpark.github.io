import { WebpackServerState } from 'express-isomorphic-extension/webpack';

export default class IsomorphicState implements WebpackServerState {
  assets: string[];
  buildHash: string;
  contentData: any;
  cssFileName: string;
  isReady: boolean = false;
  publicPath: string;
}

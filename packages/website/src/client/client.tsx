import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ClientApp from './ClientApp';
import { log } from '@@src/universal/modules/Logger';

declare global {
  interface Window {
    _babelPolyfill: any;
  }
  namespace NodeJS {
    interface Global {
      _babelPolyfill: any;
    }
  }
}

(function setBabelPolyfill() {
  if ((typeof window !== 'undefined' && !window._babelPolyfill)
    || (typeof global !== 'undefined' && !global._babelPolyfill)) {
    log(`[client] babel-polyfill is imported, since it wasn't imported yet`);
    require('babel-polyfill');
  }
})();

log('[client] Running in NODE_ENV: %s', process.env.NODE_ENV);

const appRoot = document.getElementById('app-root');

ReactDOM.hydrate(
  <ClientApp />,
  appRoot,
);

const babelRc = require('../internals/.babelrc');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

require('./server/server.ts');

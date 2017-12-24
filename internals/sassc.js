const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const INP_PATH = path.resolve(__dirname, '..', 'src', 'styles', 'main.scss');
const RES_PATH = path.resolve(__dirname, '..', 'build', 'main.css');

const result = sass.renderSync({
  file: INP_PATH,
  outputStyle: 'compressed',
  outFile: RES_PATH,
  sourceMap: true,
});

fs.writeFileSync(RES_PATH, result.css.toString('utf-8'));

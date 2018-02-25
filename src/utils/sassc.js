const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const INP_PATH = path.resolve(__dirname, '..', 'styles', 'main.scss');
const RES_PATH = path.resolve(__dirname, '..', '..', 'assets', 'css', 'main.css');

module.exports = function() {
  const result = sass.renderSync({
    file: INP_PATH,
    outputStyle: 'compressed',
    outFile: RES_PATH,
    sourceMap: true,
  });
  
  fs.writeFileSync(RES_PATH, result.css.toString('utf-8'));

  console.log(`main.css is written to ${RES_PATH}`)
};

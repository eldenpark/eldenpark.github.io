const fs = require('fs');
const minify = require('html-minifier').minify;
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..', '..');
const PAGE_PATH = path.resolve(__dirname, '..', '..', 'pages');
const LAYOUT_PATH = path.resolve(__dirname, '..', 'layouts');

function getOutputPath(filename) {
  return filename === 'index'
    ? path.resolve(ROOT_PATH, 'index.html')
    : path.resolve(ROOT_PATH, 'assets', 'html', `${filename}.html`);
}

function minifyHtml(file) {
  const html = minify(file, {
    // collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
  });

  // Remove one or more spaces between closing tag character and opening one.
  return html.replace(/>\s+</g, '><');
}

function compile({ filename }) {
  const file = require(`${LAYOUT_PATH}/${filename}`);
  const minifedFile = minifyHtml(file);
  const outputPath = getOutputPath(filename);
  fs.writeFileSync(outputPath, minifedFile);
  
  console.log(`${filename} is written to ${outputPath}`);
}

module.exports = {
  compile,
  getOutputPath,
}

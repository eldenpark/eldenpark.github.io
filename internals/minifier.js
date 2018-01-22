const minify = require('html-minifier').minify;
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.resolve(__dirname, '..', 'assets', 'html', 'index.html');
const TARGET_PATH = path.resolve(__dirname, '..', 'index.html');

const html = fs.readFileSync(HTML_PATH).toString('utf-8');
const result = minify(html, {
  collapseWhitespace: true,
  removeAttributeQuotes: true,
  removeComments: true,
});

fs.writeFileSync(TARGET_PATH, result);

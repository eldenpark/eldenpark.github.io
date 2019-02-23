const minify = require('html-minifier').minify;

exports.minifyHtml = function (file) {
  const html = minify(file, {
    // collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
  });

  // Remove one or more spaces between closing tag character and opening one.
  return html.replace(/>\s+</g, '><');
};

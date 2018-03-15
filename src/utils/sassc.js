const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const INP_PATH = path.resolve(__dirname, '..', 'styles', 'main.scss');
const RES_PATH = path.resolve(__dirname, '..', '..', 'assets', 'css', 'main.css');

const state = {
  style: '',
};

function randomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

exports.default = function () {
  const result = sass.renderSync({
    file: INP_PATH,
    outputStyle: 'compressed',
    outFile: RES_PATH,
    sourceMap: true,
  });
  fs.writeFileSync(RES_PATH, result.css.toString('utf-8'));
  console.log(`main.css is written to ${RES_PATH}`)
};

exports.globalStyle = function globalStyle(style) {
  state.style += (style + ' ');
};

exports.toStyle = function toStyle({ style, name }) {
  const className = name + '-' + randomString();
  const wrappedStyle = `.${className}{${style}} `;
  state.style += wrappedStyle;

  return className;
};

exports.writeToFile = function writeToFile() {
  console.log('[css] Writing to file');

  const compiled = sass.renderSync({
    data: state.style,
    outputStyle: 'compressed',
  });
  const css = compiled.css.toString('utf8').replace(/[\r\n]/g, '');

  console.log('[css]', css);
  fs.writeFileSync(RES_PATH, css);
  console.log(`main.css is written to ${RES_PATH}`)
};

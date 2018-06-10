const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const randomString = require('./stringUtils').randomString;

const MAIN_CSS_PATH = path.resolve(__dirname, '..', '..', 'assets', 'css', 'main.css');

/**
 * Global style state object. This keeps all the style definition of the app.
 */
const state = {
  style: '',
};

exports.toStyle = function ({ 
  name,
  global = false,
  style,
}) {
  let className = '';
  let wrappedStyle = '';

  if (global === true) {
    wrappedStyle = (style + ' ');
  } else {
    className = name + '-' + randomString();
    wrappedStyle = `.${className}{${style}} `;  
  }
  state.style += wrappedStyle;
  return className;
};

exports.generateCssFile = function () {
  console.log('[css] Writing to file');

  const compiled = sass.renderSync({
    data: state.style,
    outputStyle: 'compressed',
  });
  const css = compiled.css.toString('utf8').replace(/[\r\n]/g, '');

  console.log('[css]', css);
  fs.writeFileSync(MAIN_CSS_PATH, css);
  console.log(`main.css is written to ${MAIN_CSS_PATH}`)
};

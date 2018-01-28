const fs = require('fs');
const minify = require('html-minifier').minify;
const path = require('path');

const compile = require('./utils/fileUtils').compile;
const sassc = require('./sassc');

sassc();
compile('index');

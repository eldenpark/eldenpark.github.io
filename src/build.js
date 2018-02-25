const fs = require('fs');
const minify = require('html-minifier').minify;
const path = require('path');
const program = require('commander');

const compile = require('./utils/fileUtils').compile;
const sassc = require('./utils/sassc');

program
  .version('0.1.0')
  .usage('[option] file')
  .option('-f, --file', 'File to process')
  .parse(process.argv);

const file = 'index';
if (!program.file) {
  console.log(`'-f' File option is not given, default: 'index'.`);
}

sassc();
compile({
  filename: program.build || file,
});

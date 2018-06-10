const fs = require('fs');
const path = require('path');
const program = require('commander');

const pJson = require('../package.json');
const fileUtils = require('./utils/fileUtils');
const sassc = require('./utils/sassc');

const ROOT_PATH = path.resolve(__dirname, '..');
const LAYOUT_PATH = path.resolve(__dirname, 'layouts');

const file = 'index';

program
  .version(pJson.version)
  .usage('[option] file')
  .option('-f, --file', 'File to process')
  .parse(process.argv);

!program.file && console.log(`'-f' File option is not given, default: 'index'.`);

const createOutputPath = exports.createOutputPath = function (filename) {
  return filename === 'index'
    ? path.resolve(ROOT_PATH, 'index.html')
    : path.resolve(ROOT_PATH, 'assets', 'html', `${filename}.html`);
};

function compile({ filename }) {
  const file = require(`${LAYOUT_PATH}/${filename}`);
  const minifedFile = fileUtils.minifyHtml(file);
  const outputPath = createOutputPath(filename);
  fs.writeFileSync(outputPath, minifedFile);
  
  console.log(`${filename} is written to ${outputPath}`);
};

compile({
  filename: program.file || file,
});
sassc.generateCssFile();

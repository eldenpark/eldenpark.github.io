const { argv } = require('yargs');
const chalk = require('chalk');
const { CLIEngine } = require('eslint');
const { logger } = require('jege/server');
const path = require('path');

const log = logger('[nadan-log]');
const rootPath = path.resolve(__dirname, '../../');

async function eslint() {
  log(
    'eslint(): cwd: %s, argv: %j, rootPath: %s, fix: %s',
    process.cwd(),
    argv,
    rootPath,
    argv.fix,
  );

  const lintFilePaths = [];
  if (argv.files) {
    log(`eslint(): --files is given, We will lint only those files (separated by comma, not including whitespace).`);

    argv.files.split(',')
      .forEach((filePath) => {
        log('eslint(): lintFilePath is added: %s', filePath);
        lintFilePaths.push(filePath);
      });
  } else {
    lintFilePaths.push(rootPath);
  }

  const eslintCliOptions = {
    // envs: ['browser', 'mocha'],
    extensions: [
      'js',
      'jsx',
      'ts',
      'tsx',
    ],
    fix: !!argv.fix,
  };
  log('eslint(): executeOnFiles with options: %j', eslintCliOptions);

  const cli = new CLIEngine(eslintCliOptions);
  const report = cli.executeOnFiles(lintFilePaths);
  const {
    errorCount: reportErrorCount,
    results,
    warningCount: reportWarningCount,
  } = report;

  if (argv.fix) {
    log(`eslint(): 'fix' will be executed.`);
    results.forEach(({
      filePath,
      // output,
    }) => {
      log('eslint(): File is corrected: %s', filePath);
    });
    CLIEngine.outputFixes(report);
  }

  log('eslint(): total error: %s, total warn: %s', reportErrorCount, reportWarningCount);

  if (!reportErrorCount) {
    log('eslint(): success! no error');
    process.exit(0);
  }

  results.forEach(({
    errorCount,
    filePath,
    messages,
    warningCount,
  }) => {
    if (errorCount || warningCount) {
      const msgs = messages.map(({
        column,
        line,
        message,
        ruleId,
      }) => {
        return `(${ruleId}) ${message} at ${line}, ${column}\n`;
      });

      console.log( // eslint-disable-line
        `\neslint(): filePath: ${chalk.yellow('%s')}\nerror: %s, warn: %s\n%s`,
        filePath,
        errorCount,
        warningCount,
        msgs.join(''),
      );
    }
  });

  log(`eslint(): ${chalk.red('fail')}, errors are observed.`);
  process.exit(1);
}

if (require.main === module) {
  eslint();
}

module.exports = eslint;

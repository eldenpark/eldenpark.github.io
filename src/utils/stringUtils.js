const util = require('util');

exports.format = function format(format, ...args) {
  return args[0] && args[0] !== 'null' && args[0] !== 'undefined' && args[0].length > 0
    ? util.format(format, ...args) 
    : '';
};

const util = require('util');

exports.format = function (format, ...args) {
  return args[0] && args[0] !== 'null' && args[0] !== 'undefined' && args[0].length > 0
    ? util.format(format, ...args) 
    : '';
};

exports.randomString = function () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

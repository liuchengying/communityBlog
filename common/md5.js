var crypto = require('crypto');


const md5 = function (str) {
  var md5 = crypto.createHash('md5');
  md5.update(str);
  str = md5.digest('hex');
  return str;
}

module.exports = md5;
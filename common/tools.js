var moment = require('./moment_cn');

const validataId = {
  name: function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
  },
  isEmail: function (str) {
    return (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(str);
  }
}
/**
 * 
 * @param {*时间对象} date 
 * @param {*时间格式化方式，true为距离当前时间，false为时分秒} pattern 
 */
const format = function (date, pattern) {
  var date = moment(date);
  if(pattern) {
    return date.fromNow();
  }else {
    return date.format('YYYY-MM-DD HH:mm');
  }
}

module.exports = {
  validataId,
  format
}

var tools = require('../common/tools');

// 每个Schema模型中的时间 格式化
module.exports = function (schema) {
  schema.methods.create_at_time = function () {
    return tools.format(this.create_at, true);
  };
  schema.methods.update_at_time = function () {
    return tools.format(this.update_at, true);
  }
}
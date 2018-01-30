var model = require('../module');
var User  = model.User;

const addNewUser = function (username, password, email, callback) {
  var user = new User();
  user.username = username;
  user.password = password;
  user.email    = email;
  user.active   = false;
  user.save(callback);
}

const getUserByQuery = function (query, opt, callback) {
  User.find(query, '', opt, callback);
}

const getUserByMail = function (mail, callback) {
  console.log(222222)
  User.findOne({'email':mail}, callback);
}

const getUserByName = function (name, callback) {
  console.log(333333)
  User.findOne({'username':new RegExp('^'+ name +'$', "i")}, callback);
}
/**
 * 根据登录用户名查找用户
 * callback
 * -err 数据库异常
 * -user 用户
 * @param {* 用户名} name 
 * @param {* 回掉函数} callback 
 */
const getUserByLoginName = function (name, callback) {
  
  User.findOne({'username': name}, callback);
}
/**
 * 根据id 查找用户
 * callback
 * -err 数据库异常
 * -user 用户
 */
const getUserById = function (id, callback) {
  User.findOne({_id: id}, callback);
}
module.exports = {
  addNewUser,
  getUserByQuery,
  getUserByName,
  getUserByMail,
  getUserByLoginName,
  getUserById
}
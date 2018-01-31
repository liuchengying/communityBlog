var config = require('../config');
var User = require('../module_method').User;
// 设置cookie
const set_session = function (user, res) {
  var auth_token = user._id + '####';
  var option = {
    path: '/',
    maxAge: 1000 * 60 * 10,
    signed: true,
    httpOnly: true
  };
  res.cookie(config.auth_cookie_name, auth_token, option);

}
// 设置中间件，处理用户登录状态session
const authUser = function (req, res, next) {
  if(!req.signedCookies[config.auth_cookie_name]){
    next();
  }else {
    var auth_token = req.signedCookies[config.auth_cookie_name];
    if(!auth_token){
      return next();
    }
    var auth = auth_token.split('####');
    var user_id = auth[0];
    User.getUserById(user_id, (err, user) => {
      if(err) {
        return next(err);
      }
      res.locals.current_user = req.session.user = user;
      next();
    })
  }
}
// 检测用户是否登录（用在部分功能跳转）
const checkUserIsLogin = function (req, res, next) {
  if(!req.session || !req.session.user || !req.session.user._id){
    return res.status(403).send('forbidden!');
  }
  next();
}

module.exports = {
  set_session,
  authUser,
  checkUserIsLogin
}
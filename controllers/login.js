var eventProxy = require('eventproxy');
var User = require('../module_method').User;
var mailActiveMail = require('../common/mail');
var md5 = require('../common/md5');
var config = require('../config');
var auth =require('../middlewares/authentication');

const login = function (req, res, next) {
  
  res.render('login', {title: '登录--微小博'});
}

const login_in = function (req, res, next) {
  
  var loginname = req.body.loginname;
  var password = req.body.psd;
  var ep = new eventProxy();
  ep.fail(next);

  if (!loginname || !password) {
    res.status(422);
    return res.render('login', {
      error: '信息不完整!',
      title: '登录失败'
    });
  }
  var getUser = loginname.indexOf('@') !== -1 ? User.getUserByMail : User.getUserByName;
  ep.on('login_err', () => {
    res.status(403);
    res.render('login', {
      error: '用户名和密码错误!',
      title: '登录失败'
    });
  })
  ep.on('no_active', () => {
    res.status(402);
    res.render('login', {
      error: '该账号没有激活，我们已经在您的邮箱中发送了一封邮件，请点击激活',
      title: '登录失败'
    })
  });

  getUser(loginname, (err, user) => {
    console.log(123)
    if (err) {
      return next(err);
    }
    if (!user) {
      return ep.emit('login_err');
    }

    if (!user.active) {
      mailActiveMail(user.email, md5(user.email + user.password + config.session_secret), user.username);
      return ep.emit('no_active');
    }
    if (user.username == loginname && user.password == password) {
      auth.set_session(user, res);
      res.redirect('/');
    }

  })
}
const login_out = function (req, res, next) {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, {path: '/'});
  res.redirect('/');
}
module.exports = {
  login,
  login_in,
  login_out
};
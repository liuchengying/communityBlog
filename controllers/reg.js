
var User = require('../module_method').User;
var eventproxy = require('eventproxy');
var tool = require('../common/tools');
var mailActiveMail = require('../common/mail');
var md5 = require('../common/md5');
var config = require('../config');


const reg = function (req, res, next) {
  res.render('reg', {
    title: '注册--微小博'
  });
}
// 注册用户
const registerUser = function (req, res, next) {

  let username = req.body.loginname;
  let password = req.body.psd;
  let repepass = req.body.repepass;
  let email = req.body.email;

  var ep = new eventproxy();
  ep.fail(next);
  ep.on('input_err', (msg) => {
    res.status(422);
    res.render('reg', {
      error: msg,
      title: '注册失败',
      loginname: username,
      email: email
    })
  })
  // 表单验证
  if ([username, password, repepass, email].some((item) => item === '')) {
    ep.emit('input_err', '请填写完整的信息!');
    return;
  }

  if (!tool.validataId.name(username)) {
    ep.emit('input_err', '用户名不符合要求!');
    return;
  }

  if (!tool.validataId.isEmail(email)) {
    ep.emit('input_err', '输入邮箱不符合要求!');
    return;
  }

  if (password != repepass) {
    ep.emit('input_err', '两次密码不一致');
    return;
  }

  if (password.length < 6) {
    ep.emit('input_err', '密码不能少于6位');
    return;
  }

  // 查询邮箱或用户名是否重复
  User.getUserByQuery({
    '$or': [{
        'username': username
      },
      {
        'email': email
      }
    ]
  }, {}, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user.length > 0) {
      ep.emit('input_err', '用户名或邮箱已被使用!')
      return;
    }
    // 添加用户
    User.addNewUser(username, password, email, (err) => {
      if (err) {
        return next(err);
      }
      mailActiveMail(email, md5(email + password + config.session_secret), username);
      res.render('reg', {
        success: '恭喜你成为 微小博 的一员！我们已经给您发送了一封邮件，请激活您的账号!',
        title: '注册成功'
      });
    });
  })



}

// 账号验证
const activeAccount = function (req, res, next) {
  var key = req.query.key;
  var name = req.query.name;
  User.getUserByLoginName(name, (err, user) => {
    if(err) {
      return next(err);  
    }
    if(!user) {
      return next(new Error('[ACTIVE_ACCOUNT] 没有用户'));
    }
    var passwd = user.password;
    if(!user || md5(user.email + user.password + config.session_secret) !== key){
      return res.render('notify/notify', {error: '信息有误，账号无法激活!',title:'验证失败'});
    }
    if (user.active) {
      return res.render('notify/notify', {error:'账号已经激活!',title: '验证成功'});
    }

    user.active = true;
    user.save((err) => {
      if(err) {
        return next(err);
      }
      // res.end('111');
      res.render('notify/notify', {success: '激活成功，请',title: '验证成功'});
    })
  })
}
module.exports = {
  reg,
  registerUser,
  activeAccount
};
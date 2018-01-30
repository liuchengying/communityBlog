var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config');
var async = require('async');

var transport = mailer.createTransport(smtpTransport(config.mail_opt));
var ROOT_URL = `http://${config.host}:${config.port}`;

/**
 * 发送邮箱
 * data  邮件对象
 */

 var sendMail = function (data) {
    if(config.debug){
      return;
    }

    async.retry({times: 5}, (done) => {
      transport.sendMail(data, (err) => {
        if(err){
          console.log('邮件发送失败: '+ err);
          return done(err);
        }
        return done();
      });
    }, (err) => {
      if (err) {
        return console.log('邮件发送失败： '+ err);
      }
      console.log('邮件发送成功！');
    })
 }

 var sendActiveMail = function (who, token, name) {
  var from = config.mail_opt.auth.user;
  var to   = who;
  var subject = `${config.name}博客账号激活`;
  var html = `<p> 您好，${name}</p><p>我们收到您在${config.name}的注册信息，请点击下面链接来激活账户</p>
  <a href='${ROOT_URL}/active_account?key=${token}&name=${name}'>激活链接</a>
  <a>${ROOT_URL}/active_account?key=${token}&name=${name}</a>
  <p>若您没有在${config.name}填写过注册信息，可能是别人滥用您的邮箱，请忽略此邮件。</p>`;

  sendMail({
    from:    from,
    to:      to,
    subject: subject,
    html:    html
  });

 }



 module.exports = sendActiveMail;
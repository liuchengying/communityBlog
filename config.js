var config = {
  db: 'mongodb://127.0.0.1/node_weibo_dev',
  // 邮箱
  mail_opt: {
    host: 'smtp.126.com',
    prot: '25',
    auth: {
      user: 'lcy_snail@126.com',
      pass: 'lcy363663627',
    },
    ignoreTLS: true
  },

  host: 'localhost',
  name: '微小博',
  port: 3000,

  // session
  session_secret: 'lcy_nodejs_weibo',
  // cookie
  auth_cookie_name: 'nodejs_weibo'
}

module.exports = config;
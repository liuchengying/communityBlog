var config = require('../config');


const set_session = function (user, res) {
  var auth_token = user._id + '####';
  var option = {
    path: '/',
    maxAge: 1000 * 60,
    signed: true,
    httpOnly: true
  };
  res.cookie(config.auth_cookie_name, auth_token, option);

}

module.exports = {
  set_session
}

const home = function (req, res, next) {
  res.render('home', {title: '主页-欢迎来到微小博'});
}
module.exports = home;

const home = function (req, res, next) {
  if (req.session.user){
    
  }


  res.render('home', {title: '主页-欢迎来到微小博'});
}
module.exports = home;
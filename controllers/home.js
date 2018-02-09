var Topic = require('../module_method').Topic;
var User = require('../module_method').User;
var eventproxy = require('eventproxy');



const home = function (req, res, next) {
  var ep = new eventproxy();
  ep.fail(next);
  // 获取所有文章
  Topic.getAllTopic('*', ep.done('topics', function(topics){
    return topics;
  }));

  ep.all('topics', (topics) => {
    res.render('home', {
      title: '主页-欢迎来到微小博',
      topic: topics.reverse()
    });
  })

    
}

module.exports = home;
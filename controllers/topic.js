

var express = require('express');
var router = express.Router();
var User = require('../module_method').User;
var Topic = require('../module_method').Topic;
var markdown = require('../common/md');

const index = function (req, res, next) {
  let id = req.params.tid;
  Topic.getTopicById(id, (err, doc) => {
    if(err) {
      res.render('notify/notify',{title:'错误提示',error:'该文章不存在！'});
      return;
    }
    User.getUserById(doc.author_id, (err, user) => {
      if(err){
        res.render('notify/notify',{title:'错误提示',error:'该文章不存在！'});
        return;
      }
      doc.visit_count ++;
      doc.save();
      doc.content = markdown.render(doc.content || '');
      doc.author = user.username;
      doc.slogan = user.slogan || '';
      
      res.render('topic/readArtical',{title:'查看文章', data:doc});
    })
    
  });
}

const addTopic = function (req, res, next) {
  res.render('topic/addArtical', {
    title: '发表文章'
  });
}

const newTopic = function (req, res, next) {
  var tab = req.body.bankuai;
  var title = req.body.new_topic_title;
  var content = req.body.new_topic_content;
  var username = req.session.user.username || '';
  var id = req.session.user._id || '';
  if ( !username || !id){
    res.render('notify/notify', {error: '出错了，没有检测到用户的登录信息，请尝试重新登录',title:'出错了'});
    return;
  }
  Topic.addNewTopic(title, content, tab, id, (err) => {
    if(err){
      return next(err);
    }
    res.render('notify/notify', {success:'发表成功，感谢您的分享，赶紧前去查看吧',title:'发表成功'});
  });

}

module.exports = {
  index,
  newTopic,
  addTopic
};
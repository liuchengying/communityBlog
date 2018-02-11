const Topic = require('../module').Topic;
const User = require('../module').User;
var EventProxy = require('eventproxy');

/**
 * 添加新文章
 * @param {文章标题} title 
 * @param {文章内容} content 
 * @param {文章类型} tab 
 * @param {作者id} authorId 
 * @param {回调} callback 
 */
const addNewTopic = function (title, content, tab, authorId, callback) {
	var topic = new Topic();
	topic.title = title;
	topic.content = content;
	topic.tab = tab;
	topic.author_id = authorId;

	topic.save(callback);
}

/**
 * 获取所有类型文章
 * @param { } text 
 * @param {回调} callback 
 */
const getAllTopic = function (text, callback) {
	Topic.find({}, callback);
}
/**
 * 
 * @param {文章id} id 
 * @param {回调} callback 
 */
const getTopicById = function (id, callback) {
	Topic.findById(id, callback);
}

module.exports = {
	addNewTopic,
	getAllTopic,
	getTopicById
}
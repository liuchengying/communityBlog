const Topic = require('../module').Topic;
const User = require('../module').User;
var EventProxy = require('eventproxy');

const addNewTopic = function (title, content, tab, authorId, callback) {
	var topic = new Topic();
	topic.title = title;
	topic.content = content;
	topic.tab = tab;
	topic.author_id = authorId;

	topic.save(callback);
}

const getAllTopic = function (text, callback) {
	Topic.find({}, callback);
}

const getTopicById = function (id, callback) {
	Topic.findById(id, callback);
}

module.exports = {
	addNewTopic,
	getAllTopic,
	getTopicById
}
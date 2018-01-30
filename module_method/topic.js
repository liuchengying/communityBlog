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


module.exports = {
	addNewTopic
}
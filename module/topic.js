
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var time_module = require('./time_module');

var Topic_Schema = new Schema({
	title: { type: String },
	content: { type: String },
	author_id: { type: Schema.ObjectId },
	top: { type: Boolean, default: false },
	good: { type: Boolean, default: false },
	lock: { type: Boolean, default: false },
	replay_count: { type: Number, default: 0 },
	visit_count: { type: Number, default: 0 },
	collect_cout: { type: Number, default: 0 },
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now },
	last_reply: { type: Schema.ObjectId },
	last_reply_at: { type: Date, default: Date.now },
	content_is_html: { type: Boolean },
	tab: { type: String },
	deleted: { type: Boolean, default: false }
});

Topic_Schema.index({ author_id: 1, create_at: -1 });
Topic_Schema.plugin(time_module);



mongoose.model('Topic', Topic_Schema);
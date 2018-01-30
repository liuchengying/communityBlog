var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, (err) => {
  if (err) {
    console.log('mongoose connection error!');
    process.exit(1);
  }
});

require('./user');
require('./topic');

exports.User = mongoose.model('User');
exports.Topic = mongoose.model('Topic');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var time_module = require('./time_module');
var User_Schema = new Schema({
  username : {type: String},
  loginname: {type: String},
  password : {type: String},
  email    : {type: String},
  creattime: {type: Date, default: Date.now},
  active   : {type: Boolean},
  signature: {type: String, default:'这家伙很懒，什么都没有留下。。。'}
})

User_Schema.plugin(time_module);

mongoose.model('User', User_Schema);
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User_Schema = new Schema({
  username : {type: String},
  loginname: {type: String},
  password : {type: String},
  email    : {type: String},
  creattime: {type: Date, default: Date.now},
  active   : {type: Boolean},
})

mongoose.model('User', User_Schema);
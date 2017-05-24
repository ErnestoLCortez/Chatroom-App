var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;

var MessagesSchema = new Schema({
  username: String,
  text: String,
  avatar: String,
  time: {
      type: Date,
      default: Date.now()
  }
});

module.exports = mongoose.model('Messages', MessagesSchema);

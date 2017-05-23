//app/models/terasiteDB.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;

var MessagesSchema = new Schema({
  username: String,
  text: String,
  avatar: String,
  time: Date,
});

module.exports = mongoose.model('Messages', MessagesSchema);

// import Sequelize from 'sequelize';
// import {
//   sequelize
// }
// from './sequelize';
//
// var Messages = sequelize.define('messages', {
//   username: {
//     type: Sequelize.STRING,
//   },
//   text: {
//     type: Sequelize.STRING
//   },
//   avatar: {
//     type: Sequelize.STRING
//   },
//   time: {
//     type: Sequelize.DATE
//   }
// }, {
//   freezeTableName: true // Model tableName will be the same as the model name
// });
//
// Messages.sync().then(function() {
//   return console.log('Message table connected');
// });
//
// exports.Messages = Messages;

require('babel-register');

var Sequelize = require('sequelize');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var Messages = require('./src/data/Messages').Messages;

var storeMessage = function(message) {
  //messages.push({
  Messages.create({
    username: message['username'],
    text: message['text'],
    avatar: message['avatar'],
    time: Sequelize.fn('NOW'),
  });

}

var retreiveMessages = function(client) {
  Messages.findAll({
    limit: 10,
    order: [
      ['time', 'DESC']
    ],
  }).then(function(messages) {
    client.emit('initMessages', messages);
  });
}

io.on('connection', function(client) {

  console.log('Client connected...');

  retreiveMessages(client);

  client.on('messages', function(message) {
    storeMessage(message);
    client.broadcast.emit("messages", message);
    client.emit("messages", message);
  });

  client.on('join', function(name) {
    // client.username = name;
    // messages.forEach(function(message) {
    //   client.emit("messages", message.name + ": " + message.data)
    // });
  });

  client.on('disconnect', function(name) {
    console.log(name + " disconnected");
  });
});

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT);
app.set('IP', process.env.IP)

server.listen(process.env.PORT, function() {
  console.log('Server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

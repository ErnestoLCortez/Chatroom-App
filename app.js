var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = require('./src/data/Messages').messages;

var storeMessage = function(message) {
  messages.push({
    username: message['username'],
    text: message['text'],
    avatar: message['avatar']
  });

  if (messages.length > 10) {
    messages.shift();
  }
}

io.on('connection', function(client) {

  console.log('Client connected...');
  client.emit('initMessages', messages)

  client.on('messages', function(message) {
    storeMessage(message);
    console.log(messages)
    client.broadcast.emit("messages", message);
    client.emit("messages", message);
  });

  client.on('join', function(name) {
    client.username = name;
    messages.forEach(function(message) {
      client.emit("messages", message.name + ": " + message.data)
    });
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

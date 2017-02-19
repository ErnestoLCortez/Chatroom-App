var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];

var storeMessage = function(name, data){
  messages.push({name: name, data: data});
  if (messages.length > 10){
      messages.shift();
  }
}

io.on('connection', function(client){
  
  console.log('Client connected...');
  
  client.on('messages', function(message){
    client.get("nickname", function(error, name){
      client.broadcast.emit("messages", name + ": " + message);
      client.emit("messages", name + ": " + message);
      storeMessage(name, message);
    });  
  });
  
  client.on('join', function(name){
    messages.forEach(function(message) {
      client.emit("messages", message.name + ": " + message.data)
    });
  });
  
  client.on('disconnect', function(name){
    console.log(name + " disconnected");
  });
});

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT);
app.set('IP', process.env.IP)

server.listen(process.env.PORT, function (){
  console.log('Server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

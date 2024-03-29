require('babel-register');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var Messages = require('./src/data/Messages');
var ChatBot = require('./src/bot/chatbot').ChatBot;
var weather = require('npm-openweathermap');
var openweatherkey = require('./src/config').openweatherkey;
weather.api_key = openweatherkey;
weather.temp = 'f';

var fetchWeather = function(client, command) {
  weather.get_weather_custom('zip', '93933', command)
    .then(function(res) {
      client.emit('messages', {
        username: "Bot",
        text: res.weather[0].description,
        avatar: "img/robot.png",
      });
    }, function(error) {
      client.emit('messages', {
        username: "Bot",
        text: error,
        avatar: "img/robot.png",
      });
    })
};

var storeMessage = function(message) {

  new Messages({
    username: message['username'],
    text: message['text'],
    avatar: message['avatar'],
    time: Date.now()
  }).save(function(err){
    if(err) console.log(err);
  });

};

var retreiveMessages = function(client) {
  Messages.find()
  .sort({'time': -1})
  .limit(10)
  .exec(function(err, messages) {
    client.emit('initMessages', messages);
  });
};

var userList = {}
io.on('connection', connCallBack);

function connCallBack(client) {
  console.log('Client connected...');

  client.on('messages', function(message) {

    var processing = ChatBot.processMessage(message);

    if (processing.botMessage) {
      client.broadcast.emit('messages', processing.botMessage);
      client.emit('messages', processing.botMessage)
      if (processing.botMessage.text === 'Fetching weather...') {
        fetchWeather(client, 'weather');
      }
    }

    storeMessage(message);
    client.broadcast.emit("messages", message);
    client.emit("messages", message);
  });

  client.on('join', function(userInfo) {

    client.username = userInfo.username;
    client.avatar = userInfo.avatar
    userList[client.id] = {
      username: userInfo.username,
      avatar: userInfo.avatar
    }
    io.emit('messages', ChatBot.userConnect(client.username));
    io.emit('userlist', userList);
    retreiveMessages(client);

  });

  client.on('disconnect', function(name) {
    delete userList[client.id];
    io.emit('userlist', userList);
    if (client.username) {
      io.emit('messages', ChatBot.userDisconnect(client.username));
    }
  });
};

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 8080);
app.set('IP', process.env.IP || '0.0.0.0')

var Server = server.listen(process.env.PORT, function() {
  console.log('Server listening on port %d in %s mode', app.get('port'), app.get('IP'));
});

module.exports = Server;

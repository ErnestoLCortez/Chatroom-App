function connCallBack(client) {
  console.log('Client connected...');
  retreiveMessages(client);
};

function messageEvent(message) {


  var processing = ChatBot.processMessage(message);

  if (processing.botMessage) {
    client.broadcast.emit('messages', processing.botMessage);
    client.emit('messages', processing.botMessage)
  }

  storeMessage(message);
  client.broadcast.emit("messages", message);
  client.emit("messages", message);
}

function joinEvent(userInfo) {

  client.username = userInfo.username;
  client.avatar = userInfo.avatar
  userList[client.id] = {
    username: userInfo.username,
    avatar: userInfo.avatar
  }


  io.emit('messages', ChatBot.userConnect(client.username));
  io.emit('userlist', userList);

}

function disconnectEvent(name) {
  delete userList[client.id];
  io.emit('userlist', userList);
  if (client.username) {
    io.emit('messages', ChatBot.userDisconnect(client.username));
  }
}

import * as SocketIO from 'socket.io-client';

var socketURL = "http://" + process.env.IP + ":" + process.env.PORT;

test('Join event via sockets', () => {
  var Socket = SocketIO.connect(socketURL);
  var done = false;
  Socket.emit('join', {
    username: 'testName',
    avatar: 'testAvatar',
  })

  Socket.on('userList', function(object) {
    expect(object).toEqual({
      socketid: {
        username: 'testName',
        avatar: 'testAvatar'
      }
    });

    done = true;
  });
  if (done) {
    Socket.disconnect();
    done();
  }
});

test('Disonnect event via sockets - user left notice', () => {
  var Socket = SocketIO.connect(socketURL);
  var done = false;
  Socket.emit('disconnect', 'test@email.com');

  Socket.on('messages', function(object) {
    expect(object).toEqual({
      username: "Bot",
      text: "test@email.com has left the channel.",
      avatar: "img/robot.png",
    });

    done = true;
  });
  if (done) {
    Socket.disconnect();
    done();
  }
});

test('Disonnect event via sockets - userList update', () => {
  var Socket = SocketIO.connect(socketURL);
  var done = false;
  Socket.emit('disconnect', 'test@email.com');

  Socket.on('userlist', function(object) {
    expect(object).toEqual({});
    done = true;
  });
  if (done) {
    Socket.disconnect();
    done();
  }
});

test('Messages event via sockets', () => {
  var Socket = SocketIO.connect(socketURL);
  var done = false;
  Socket.emit('messages', {
    username: "testName",
    text: "test message",
    avatar: "testAvatar",
  });

  Socket.on('messages', function(object) {
    expect(object).toEqual({
      username: "testName",
      text: "test message",
      avatar: "testAvatar",
    });

    done = true;
  });
  if (done) {
    Socket.disconnect();
    done();
  }
});


test('Connection event via sockets', () => {
  var Socket = SocketIO.connect(socketURL);
  var done = false;

  Socket.on('initMessages', function(object) {
    expect(object).toBeDefined();
    done = true;
  });
  if (done) {
    Socket.disconnect();
    done();
  }
});

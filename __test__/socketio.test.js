import * as SocketIO from 'socket.io-client';


var io = require('socket.io').listen(5000);

io.on('connection', function(client) {
  client.emit('message', 'connected');
});

test('Connection to server via sockets', () => {
  var Socket = SocketIO.connect('http://0.0.0.0:5000');
  var x = "";
  Socket.on('message', function(data) {
    x = data;
    expect(x).toBe('connected');
  });

});

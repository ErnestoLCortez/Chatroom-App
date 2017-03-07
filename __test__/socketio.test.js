import {
  server
}
from '../app';

import * as SocketIO from 'socket.io-client';

test('Join event via sockets', () => {
  var Socket = SocketIO.connect('http://0.0.0.0:8080');
  var done = false;
  Socket.emit('join', {
    username: 'testName',
    avatar: 'testAvatar',
  })

  Socket.on('messages', function(object) {
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

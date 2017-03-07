const request = require('supertest');
var Server;

//Start server before each test
beforeEach(() => {
  Server = require('../app').default;
});
//Close server after each test
afterEach(() => {
  Server.close();
});

describe('Server test 1', function() {
  it('Access root /', function() {
    return request(Server)
      .get('/')
      .expect(200)
  });
});

describe('Server test 2', function() {
  it('Access wrong route', function() {
    return request(Server)
      .get('/foo/bar')
      .expect(404)
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is exported from app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API', () => {
  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('username', 'testuser');
        done();
      });
  });

  // Add more tests for getUser, editUser, deleteUser, etc.
});

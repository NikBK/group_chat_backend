const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is exported from app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('Authentication API', () => {
  it('should login with correct credentials', (done) => {
    chai
      .request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  // Add more tests for logout, handle incorrect credentials, etc.
});

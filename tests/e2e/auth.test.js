import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../app.js';


describe('Authentication API', () => {
  it('POST /api/auth/login - Login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'tester@gmail.com', password: 'tester@123' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('POST /api/auth/login - Login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'tester@gmail.com', password: 'wrongpassword' });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Invalid credentials');
  });

  it('POST /api/auth/logout - Logout from the application', async () => {
    const res = await request(app)
      .post('/api/auth/logout');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Logout successful');
  });

});
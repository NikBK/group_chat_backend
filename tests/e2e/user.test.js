import { describe, it, after } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../app.js';
import { User } from '../../models/User.js';


var random = Math.random();
var token = null;
var userId = null;

describe('Admin routes on User API', () => {
  it('POST /api/auth/login - Admin Login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@gmail.com', password: 'admin@123' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('POST /api/admin/createUser - Admin should create a new user', async () => {
    const res = await request(app)
      .post('/api/admin/createUser')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'testuser' + random,
        email: 'testuser' + random + '@example.com',
        password: 'password' + random,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('username', 'testuser' + random);
    expect(res.body).to.have.property('email', 'testuser' + random + '@example.com');
    userId = res.body._id;
  });

  it('POST /api/admin/user/:id - Admin should edit the user', async () => {
    const res = await request(app)
      .put(`/api/admin/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'testuser' + random + 'update',
        email: 'testuser' + random + 'update@example.com',
        password: 'passwordupdate' + random,
      });

    expect(res.status).to.equal(200);
    expect(res.body.user).to.have.property('username', 'testuser' + random + 'update');
    expect(res.body.user).to.have.property('email', 'testuser' + random + 'update@example.com');
  });


  it('POST /api/auth/login - Non-Admin login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'tester@gmail.com', password: 'tester@123' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('POST /api/admin/createUser - Non-Admin should not be able to create a new user', async () => {
    random = Math.random();
    const res = await request(app)
      .post('/api/admin/createUser')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'testuser' + random,
        email: 'testuser' + random + '@example.com',
        password: 'password' + random,
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error', 'Not authorized to access this resource');
  });

  it('PUT /api/admin/user/:id - Non-Admin should not edit the user', async () => {
    const res = await request(app)
      .put(`/api/admin/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'testuser' + random + 'update',
        email: 'testuser' + random + 'update@example.com',
        password: 'passwordupdate' + random,
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error', 'Not authorized to access this resource');
  });

  after(async () => {
    // Clean up created users from the database
    await User.deleteMany({ email: { $regex: /^testuser/ } });
  });

});

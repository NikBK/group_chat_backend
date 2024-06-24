import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../app.js';
import { Group } from '../../models/Group.js';
import { User } from '../../models/User.js';


describe('Group Management API\'s', () => {
    let authToken;

    before(async () => {
        // Login a user and obtain authentication token
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({ email: 'tester@gmail.com', password: 'tester@123' });

        authToken = loginRes.body.token;
    });

    it('POST /api/groups - Should create a new group', async () => {
        const groupName = 'Test Group';

        const res = await request(app)
            .post('/api/groups')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: groupName });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('name', groupName);
        expect(res.body).to.have.property('members').that.length.is.greaterThan(0);
    });

    it('GET /api/groups/search?q=test - Should search for groups', async () => {
        const query = 'test';
        const res = await request(app)
            .get(`/api/groups/search?q=${query}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('groups');
    });

    it('POST /api/groups/:id/members - Should add members to a group', async () => {
        const group = await Group.findOne({ name: 'Test Group' });
        const users = await User.find({ isAdmin: false }).limit(3).select('_id');
        const userIds = users.map(user => user._id.toString());

        const res = await request(app)
            .put(`/api/groups/${group._id}/members`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ userIds });

        expect(res.status).to.equal(200);
        expect(res.body.group.members).that.length.is.greaterThanOrEqual(userIds.length);
    });

    it('DELETE /api/groups/:id - Should delete a group', async () => {
        const group = await Group.findOne({ name: 'Test Group' });

        const res = await request(app)
            .delete(`/api/groups/${group._id}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Group deleted successfully.');
    });

});

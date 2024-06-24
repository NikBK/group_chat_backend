import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../app.js';
import { GroupMessage } from '../../models/GroupMessage.js';


describe('Group Messaging API\'s test', () => {
    let authToken;
    let groupId;

    before(async () => {
        // Login a user and obtain authentication token
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({ email: 'tester@gmail.com', password: 'tester@123' });

        authToken = loginRes.body.token;
    });

    it('POST /api/groups - Create a new group', async () => {
        const res = await request(app)
            .post('/api/groups')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Test Group' });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('name', 'Test Group');
        groupId = res.body._id;
    });

    it('POST /api/groups/:groupId/messages/send - Send a message in the group', async () => {
        const messageText = 'Hello, Group!';

        const res = await request(app)
            .post(`/api/groups/${groupId}/messages/send`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ messageContent: messageText });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body.message).to.have.property('text', messageText);
    });

    it('POST /api/groups/:groupId/messages/:messageId/like - Like a message in the group', async () => {
        const message = await GroupMessage.findOne({ group: groupId });
        const messageId = message._id;

        const res = await request(app)
            .post(`/api/groups/${groupId}/messages/${messageId}/like`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body.message.likes).that.length.is.greaterThan(0);
    });

    after(async () => {
        // Clean up created group from the database which cascades to delete related messages
        await request(app)
            .delete(`/api/groups/${groupId}`)
            .set('Authorization', `Bearer ${authToken}`);
    });
});

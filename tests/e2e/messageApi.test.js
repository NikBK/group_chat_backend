const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const GroupMessage = require('../../models/GroupMessage'); // Adjust path as needed
const { app } = require('../../app'); // Assuming your app is exported from app.js
const connectDB = require('../../lib/db');
const { expect } = chai;

chai.use(chaiHttp);

describe('Group Message API', () => {
    // Before running tests, connect to test database or set up mocks
    before(async () => {
        // Connect to test database if needed
        // Example: await mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true });
        connectDB();
    });

    // After tests, clean up resources (e.g., disconnect from database)
    after(async () => {
        // Example: await mongoose.connection.close();
    });

    describe('POST /api/auth/login', () => {
        it('should login the user', async () => {

        })
    })

    // describe('POST /api/groups/:groupId/messages/send', () => {
    //     it('should send a message to a group', async () => {
    //         const newMessage = {
    //             messageContent: 'Test message content',
    //         };

    //         // Replace :groupId with an actual valid group ID in your test database
    //         const groupId = 'replace-with-valid-group-id';

    //         const res = await chai.request(app)
    //             .post(`/api/groups/${groupId}/messages/send`)
    //             .send(newMessage);

    //         expect(res).to.have.status(201);
    //         expect(res.body).to.be.an('object');
    //         expect(res.body).to.have.property('success').to.be.true;
    //         expect(res.body).to.have.property('message');
    //         expect(res.body.message).to.have.property('_id');
    //         expect(res.body.message).to.have.property('text', newMessage.messageContent);
    //     });
    // });

    // describe('POST /api/groups/:groupId/messages/:messageId/like', () => {
    //     it('should like a message in a group', async () => {
    //         // Replace :groupId and :messageId with valid IDs from your test database
    //         const groupId = 'replace-with-valid-group-id';
    //         const messageId = 'replace-with-valid-message-id';

    //         const res = await chai.request(app)
    //             .post(`/api/groups/${groupId}/messages/${messageId}/like`);

    //         expect(res).to.have.status(200);
    //         expect(res.body).to.be.an('object');
    //         expect(res.body).to.have.property('success').to.be.true;
    //         expect(res.body).to.have.property('message');
    //         expect(res.body.message).to.have.property('_id', messageId);
    //         expect(res.body.message).to.have.property('likes').to.be.an('array').that.includes.members([userId]); // Replace userId with actual user ID
    //     });
    // });
});

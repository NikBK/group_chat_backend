import chai from 'chai';
import chaiHttp from 'chai-http';
import connectDB from '../lib/db.js';
import app from '../app.js';

const { expect } = chai;

chai.use(chaiHttp);

describe('Authentication API', () => {
  // Before running tests, connect to test database or set up mocks
  before(async () => {
    // Connect to test database if needed
    // Example: await mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true });
    await connectDB();
    // Create a mock user for testing
    // const mockUser = new User({
    //   username: 'testuser',
    //   email: 'test@example.com',
    //   password: 'password123', // Ensure this is hashed in actual application
    // });
    // await mockUser.save();
  });

  // After tests, clean up resources (e.g., disconnect from database)
  after(async () => {
    // Example: await mongoose.connection.close();
  });

  describe('POST /api/auth/login', () => {
    it('should authenticate user and return JWT token', async () => {
      const credentials = {
        email: 'tester@gmail.com',
        password: 'tester@123',
      };

      const res = await chai.request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('token');
      // expect(res.body).to.have.property('expiresIn');
      // expect(res.body).to.have.property('userId'); // Optional: If your response includes user ID

      // You can also validate the decoded token payload if needed
      // Example: const decodedToken = jwt.decode(res.body.token);
      // expect(decodedToken).to.have.property('email', credentials.email);

      // Optionally store the token for subsequent requests in the tests
      // Example: const authToken = res.body.token;
    });

    it('should return 401 Unauthorized for invalid credentials', async () => {
      const invalidCredentials = {
        email: 'invalid@example.com',
        password: 'invalidpassword',
      };

      const res = await chai.request(app)
        .post('/api/auth/login')
        .send(invalidCredentials);

      expect(res).to.have.status(401);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error', 'Invalid credentials');
    });
  });
});

const mongoose = require('mongoose');
const app = require('../../app');
const request = require('supertest');
const { DB_HOST_TEST, PORT } = process.env;
const { User } = require('../../models');

describe('test login route', () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  //   beforeEach(async () => {});

  afterEach(async () => {
    await User.findOneAndUpdate(
      { email: 'fovebet757@soremap.com' },
      { token: null }
    );
  });

  test('test login with correct data', async () => {
    const loginData = {
      email: 'fovebet757@soremap.com',
      password: '111111',
    };
    const { statusCode, body } = await request(app)
      .post('/api/users/login')
      .send(loginData);
    expect(statusCode).toBe(200);

    expect(body.token).toEqual(expect.any(String));
    const user = await User.findOne({ token: body.token });
    expect(user).toBeTruthy();

    expect(body.user.email).toEqual(expect.any(String));
    expect(body.user.email).toBe(loginData.email);

    expect(body.user.subscription).toEqual(expect.any(String));
    expect(body.user.subscription).toMatch(/starter|pro|business/);
  });
});

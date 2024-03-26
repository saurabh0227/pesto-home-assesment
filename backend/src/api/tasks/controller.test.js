const app = require('../../index');
const request = require('supertest');
const config = require('../../config/config');
const mongoose = require('mongoose');

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(config.mongo_uri);
});

/* Closing connection after all tests. */
afterAll(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('GET /tasks/fetch', () => {
  test('It should respond with status 200', async () => {
    const response = await request(app).get('/tasks/fetch'); // Adjust the route path
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /tasks/add', () => {
  it('It should create a task', async () => {
    const res = await request(app).post('/tasks/add').send({
      title: 'Test Task',
      description: 'Test task Description',
      status: 'To Do'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success.data.title).toBe('Test Task');
  });
});

describe('PUT /tasks/update/:id', () => {
  it('It should update a task', async () => {
    const res = await request(app)
      .put('/tasks/update/6602e0a05871f9c139b6d991')
      .send({
        title: '7',
        description: '7',
        status: 'To Do'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success.data.status).toBe('To Do');
  });
});

describe('Put /tasks/delete/:id', () => {
  it('should delete a product', async () => {
    const res = await request(app).put(
      '/tasks/delete/6602665c8dfb7d38f379dfb0'
    );
    expect(res.statusCode).toBe(204);
  });
});

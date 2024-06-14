import request from 'supertest';
import app from '../src/app';

describe('User API', () => {
  it('should create a user', async () => {
    const response = await request(app).post('/api/users').send({ name: 'John' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John');
  });

  // Add more tests for other endpoints and scenarios
});

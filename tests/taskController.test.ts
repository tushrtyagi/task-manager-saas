import request from 'supertest';
import app from '../src/app';

describe('Task API', () => {
  it('should create a task', async () => {
    const userResponse = await request(app).post('/api/users').send({ name: 'John' });
    const userId = userResponse.body.id;

    const response = await request(app)
      .post(`/api/${userId}/tasks`)
      .send({ title: 'Test Task', description: 'Test description', dueDate: new Date(), status: 'To Do' });
      

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Task');
      });
    
      it('should get tasks for a user', async () => {
        const userResponse = await request(app).post('/api/users').send({ name: 'Jane' });
        const userId = userResponse.body.id;
    
        await request(app)
          .post(`/api/${userId}/tasks`)
          .send({ title: 'Task 1', description: 'Description 1', dueDate: new Date(), status: 'To Do' });
    
        const response = await request(app).get(`/api/${userId}/tasks`);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Task 1');
      });
    
      it('should get a specific task for a user', async () => {
        const userResponse = await request(app).post('/api/users').send({ name: 'Tom' });
        const userId = userResponse.body.id;
    
        const taskResponse = await request(app)
          .post(`/api/${userId}/tasks`)
          .send({ title: 'Task 2', description: 'Description 2', dueDate: new Date(), status: 'To Do' });
        const taskId = taskResponse.body.id;
    
        const response = await request(app).get(`/api/${userId}/tasks/${taskId}`);
    
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Task 2');
      });
    
      it('should update a task for a user', async () => {
        const userResponse = await request(app).post('/api/users').send({ name: 'Alice' });
        const userId = userResponse.body.id;
    
        const taskResponse = await request(app)
          .post(`/api/${userId}/tasks`)
          .send({ title: 'Task 3', description: 'Description 3', dueDate: new Date(), status: 'To Do' });
        const taskId = taskResponse.body.id;
    
        const response = await request(app)
          .put(`/api/${userId}/tasks/${taskId}`)
          .send({ title: 'Updated Task 3', description: 'Updated Description 3', status: 'In Progress' });
    
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Task 3');
      });
    
      it('should delete a task for a user', async () => {
        const userResponse = await request(app).post('/api/users').send({ name: 'Bob' });
        const userId = userResponse.body.id;
    
        const taskResponse = await request(app)
          .post(`/api/${userId}/tasks`)
          .send({ title: 'Task 4', description: 'Description 4', dueDate: new Date(), status: 'To Do' });
        const taskId = taskResponse.body.id;
    
        const deleteResponse = await request(app).delete(`/api/${userId}/tasks/${taskId}`);
    
        expect(deleteResponse.status).toBe(204);
    
        const getResponse = await request(app).get(`/api/${userId}/tasks/${taskId}`);
    
        expect(getResponse.status).toBe(404);
      });
    });
    
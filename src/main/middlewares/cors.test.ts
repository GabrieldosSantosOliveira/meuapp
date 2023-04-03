import request from 'supertest';

import { setupApp } from '../config';
describe('CORS Middleware', () => {
  it('should enable cors', async () => {
    const { app } = setupApp();

    app.get('/test_cors', (req, res) => {
      res.send('');
    });
    const res = await request(app).get('/test_cors');
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['access-control-allow-methods']).toBe('*');
    expect(res.headers['access-control-allow-headers']).toBe('*');
  });
});

import request from 'supertest';

import { setupApp } from '../config';

describe('Content-Type Middleware', () => {
  it('should return content-type json for default', async () => {
    const { app } = setupApp();

    app.get('/test_content_type', (req, res) => {
      res.send({ name: 'any_name' });
    });
    await request(app).get('/test_content_type').expect('content-type', /json/);
  });
});

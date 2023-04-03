import request from 'supertest';

import { setupApp } from '../config';

describe('Json Parser Middleware', () => {
  it('should parser body', async () => {
    const { app } = setupApp();

    app.get('/test_json_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .get('/test_json_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' });
  });
});

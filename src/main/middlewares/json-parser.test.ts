import supertest from 'supertest';

import { setupApp } from '../config';
describe('Json Parser Middleware', () => {
  it('should parser body', () => {
    const { app } = setupApp();
    app.get('/test_cors', (req, res) => {
      res.send(req.body);
    });
    supertest(app)
      .get('/test_json_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' });
  });
});

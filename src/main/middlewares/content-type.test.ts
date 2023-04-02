import supertest from 'supertest';

import { setupApp } from '../config';

describe('Content-Type Middleware', () => {
  it('should return content-type json for default', () => {
    const { app } = setupApp();
    supertest(app).get('/test_content_type').expect('content-type', /json/);
  });
});

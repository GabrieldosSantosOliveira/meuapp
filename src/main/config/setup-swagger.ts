import { Express } from 'express';
import { setup, serve } from 'swagger-ui-express';

import docs from './../docs';
export const setupSwagger = (app: Express) => {
  app.use('/api-docs', serve, setup(docs));
};

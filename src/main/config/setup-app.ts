import express from 'express';

import { cors, jsonParser, logger } from '../middlewares';
import { setupRoutes } from './setup-routes';
import { setupSwagger } from './setup-swagger';

export const setupApp = () => {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors);
  app.use(jsonParser);
  app.use(logger);
  setupRoutes(app);
  setupSwagger(app);
  return { app };
};

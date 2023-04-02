import express from 'express';

import { contentType } from '../middlewares/content-type';
import { cors } from '../middlewares/cors';
import { jsonParser } from '../middlewares/json-parser';
import { setupRoutes } from './setup-routes';
export const setupApp = () => {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors);
  app.use(jsonParser);
  app.use(contentType);
  setupRoutes(app);
  return { app };
};

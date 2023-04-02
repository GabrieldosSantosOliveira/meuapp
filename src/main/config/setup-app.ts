import express from 'express';

import { contentType, cors, jsonParser } from '../middlewares';
import { setupRoutes } from './index';
export const setupApp = () => {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors);
  app.use(jsonParser);
  app.use(contentType);
  setupRoutes(app);
  return { app };
};

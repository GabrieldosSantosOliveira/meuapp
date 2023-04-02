import { Express, Router } from 'express';
import fs from 'fs';
import { resolve } from 'path';
const router = Router();
export const setupRoutes = (app: Express) => {
  app.use('/api', router);
  const filenames = fs.readdirSync(resolve(__dirname, '..', 'routes'));
  filenames.map(async (file) => {
    const route = await import(`../routes/${file}`);
    route.default(router);
  });
};

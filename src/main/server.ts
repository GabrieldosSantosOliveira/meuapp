import { env } from './config/env';
import { setupApp } from './config/setup-app';

const { app } = setupApp();
app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});

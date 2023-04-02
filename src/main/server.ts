import { env, setupApp } from './config';

const { app } = setupApp();
app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});

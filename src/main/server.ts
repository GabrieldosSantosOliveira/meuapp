import { env, setupApp } from './config';

const { app } = setupApp();
app.listen(env.PORT, () => {
  console.log(`Server running at ${env.BASE_URL}`);
});

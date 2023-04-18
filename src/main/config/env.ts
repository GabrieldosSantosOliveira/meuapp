import 'dotenv/config';
const PORT = 3000;
export const env = {
  PORT: Number(process.env.PORT) || PORT,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || 'any_access_token',
  SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN || 'any_refresh_token',
  BASE_URL: process.env.BASE_URL || `http://localhost:${PORT}`,
  SIZE_FOR_PAGE: Number(process.env.BASE_URL) || 20,
};

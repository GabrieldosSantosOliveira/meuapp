import 'dotenv/config';
export const env = {
  PORT: Number(process.env.PORT) || 3000,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || 'any_access_token',
  SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN || 'any_refresh_token',
};

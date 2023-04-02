import 'dotenv/config';
export const env = {
  PORT: Number(process.env.PORT) || 3333,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || 'any_access_token',
  SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN || 'any_refresh_token',
};

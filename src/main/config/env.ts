import 'dotenv/config';
const PORT = 3000;
let MAIL_SECURE: boolean | null = null;
if (process.env.MAIL_SECURE) {
  MAIL_SECURE = process.env.MAIL_SECURE === 'true';
}
export const env = {
  PORT: Number(process.env.PORT) || PORT,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || 'any_access_token',
  SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN || 'any_refresh_token',
  BASE_URL: process.env.BASE_URL || `http://localhost:${PORT}`,
  SIZE_FOR_PAGE: Number(process.env.SIZE_FOR_PAGE) || 20,
  MAIL_HOST: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
  MAIL_PORT: Number(process.env.MAIL_PORT) || 465,
  MAIL_SECURE: MAIL_SECURE || false,
  MAIL_AUTH_USER: process.env.MAIL_AUTH_USER || '237f6cddc7bd86',
  MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS || '5f2205551637fe',
};

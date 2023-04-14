import { AuthService } from '@/infra/auth';
import { JwtAdapter } from '@/infra/cryptography';
import { env } from '@/main/config/env';

const jwtAdapter = new JwtAdapter();
const ONE_MINUTE = 60 * 60 * 24;
const ONE_WEEK = 60 * 60 * 24 * 7;
const authService = new AuthService({
  decrypt: jwtAdapter,
  encrypt: jwtAdapter,
  expirationAccessToken: ONE_MINUTE,
  expirationRefreshToken: ONE_WEEK,
  secretAccessToken: env.SECRET_ACCESS_TOKEN,
  secretRefreshToken: env.SECRET_REFRESH_TOKEN,
});
export { authService };

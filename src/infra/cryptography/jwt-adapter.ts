import {
  Decrypt,
  Encrypt,
  OptionsDecrypt,
  OptionsEncrypt,
  Payload,
} from '@/interface/index';
import { UnauthorizedException } from '@/utils/http';
import jwt from 'jsonwebtoken';
export class JwtAdapter implements Encrypt, Decrypt {
  async decrypt(
    encryptText: string,
    options: OptionsDecrypt,
  ): Promise<Payload> {
    try {
      return jwt.verify(encryptText, options.secret) as Payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
  async encrypt(identifier: string, options: OptionsEncrypt): Promise<string> {
    return jwt.sign({ sub: identifier }, options.secret, {
      expiresIn: options.expire,
    });
  }
}

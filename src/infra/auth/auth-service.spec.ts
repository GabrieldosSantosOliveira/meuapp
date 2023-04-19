import { Payload, Decrypt, Encrypt } from '@/interface/index';

import { AuthService, Params } from './auth-service';
class EncryptAndDecryptSpy implements Encrypt, Decrypt {
  async decrypt(): Promise<Payload> {
    return { sub: 'any_identifier' };
  }
  async encrypt(): Promise<string> {
    return 'encrypt';
  }
}
class EncryptAndDecryptSpyWithError implements Encrypt, Decrypt {
  async decrypt(): Promise<Payload> {
    throw new Error();
  }
  async encrypt(): Promise<string> {
    throw new Error();
  }
}
const makeEncryptAndDecryptSpy = () => {
  const encryptAndDecryptSpy = new EncryptAndDecryptSpy();
  return { encryptAndDecryptSpy };
};
const makeSut = (params: Partial<Params> = {}) => {
  const { encryptAndDecryptSpy } = makeEncryptAndDecryptSpy();
  const sut = new AuthService({
    decrypt: encryptAndDecryptSpy,
    encrypt: encryptAndDecryptSpy,
    expirationAccessToken: 30,
    expirationRefreshToken: 60,
    secretAccessToken: 'any_secret_access_token',
    secretRefreshToken: 'any_secret_refresh_token',
    ...params,
  });
  return { sut, encryptAndDecryptSpy };
};
describe('Auth Service', () => {
  it('should throw error if secretAccessToken is equal secretRefreshToken', () => {
    expect(() =>
      makeSut({ secretAccessToken: 'secret', secretRefreshToken: 'secret' }),
    ).toThrow();
  });
  describe('decrypt', () => {
    it('should return a payload if success', async () => {
      const { sut } = makeSut();
      const payloadAccessToken = await sut.decryptAccessToken(
        'hash_access_token',
      );
      const payloadRefreshToken = await sut.decryptRefreshToken(
        'hash_refresh_token',
      );
      expect(payloadAccessToken).toEqual({ sub: 'any_identifier' });
      expect(payloadRefreshToken).toEqual({ sub: 'any_identifier' });
    });
    it('should return throw if Decrypt throw', async () => {
      const { sut } = makeSut({
        decrypt: new EncryptAndDecryptSpyWithError(),
        encrypt: new EncryptAndDecryptSpyWithError(),
      });
      const payloadAccessToken = sut.decryptAccessToken('hash_access_token');
      const payloadRefreshToken = sut.decryptRefreshToken('hash_refresh_token');
      expect(payloadAccessToken).rejects.toThrow();
      expect(payloadRefreshToken).rejects.toThrow();
    });
  });
  describe('encrypt', () => {
    it('should return accessToken or refreshToken if success', async () => {
      const { sut } = makeSut();
      const accessToken = await sut.generateAccessToken('any_identifier');
      const refreshToken = await sut.generateRefreshToken('any_identifier');
      expect(accessToken).toEqual({
        accessToken: 'encrypt',
      });
      expect(refreshToken).toEqual({
        refreshToken: 'encrypt',
      });
    });
    it('should throw if Encrypt throw', async () => {
      const { sut } = makeSut({
        decrypt: new EncryptAndDecryptSpyWithError(),
        encrypt: new EncryptAndDecryptSpyWithError(),
      });
      expect(
        async () => await sut.generateAccessToken('any_identifier'),
      ).rejects.toThrow();
      expect(
        async () => await sut.generateRefreshToken('any_identifier'),
      ).rejects.toThrow();
    });
    it('should return accessToken and refreshToken', async () => {
      const { sut } = makeSut();
      const res = await sut.generateRefreshTokenAndAccessToken('any_id');
      expect(res).toEqual({
        accessToken: 'encrypt',
        refreshToken: 'encrypt',
      });
    });
  });
});

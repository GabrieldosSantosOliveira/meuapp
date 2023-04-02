import { makeThrowError } from '@/test/factories/factory-throw-error';
import { UnauthorizedException } from '@/utils/http/exception/unauthorized-exception';
import jwt from 'jsonwebtoken';

import { JwtAdapter } from './jwt-adapter';
const makeSut = () => {
  const sut = new JwtAdapter();
  return { sut };
};
jest.mock('jsonwebtoken', () => ({
  sign() {
    return 'any_text_encrypt';
  },
  verify() {
    return 'any_text';
  },
}));
describe('Jwt Adapter', () => {
  describe('encrypt', () => {
    it('should call sign with correct params', async () => {
      const { sut } = makeSut();
      const spyJwt = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_id', { expire: 30, secret: 'secret' });
      expect(spyJwt).toHaveBeenCalledWith({ sub: 'any_id' }, 'secret', {
        expiresIn: 30,
      });
    });
    it('should return a textEncrypt if correct param is provided', async () => {
      const { sut } = makeSut();
      const textEncrypt = await sut.encrypt('any_id', {
        expire: 30,
        secret: 'secret',
      });
      expect(textEncrypt).toBe('any_text_encrypt');
    });
    it('should throw if sign throw', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(makeThrowError);
      expect(
        async () =>
          await sut.encrypt('any_id', {
            expire: 30,
            secret: 'secret',
          }),
      ).rejects.toThrow();
    });
  });
  describe('decrypt', () => {
    it('should call verify with correct params', async () => {
      const { sut } = makeSut();
      const spyJwt = jest.spyOn(jwt, 'verify');
      await sut.decrypt('any_id', { secret: 'secret' });
      expect(spyJwt).toHaveBeenCalledWith('any_id', 'secret');
    });
    it('should return a payload if verify success', async () => {
      const { sut } = makeSut();
      const payload = await sut.decrypt('any_id', { secret: 'secret' });
      expect(payload).toBe('any_text');
    });
    it('should return throw if verify throw', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(makeThrowError);
      const error = sut.decrypt('any_id', { secret: 'secret' });
      expect(async () => error).rejects.toThrow(UnauthorizedException);
    });
  });
});

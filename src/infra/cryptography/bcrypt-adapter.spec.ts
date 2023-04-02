import { makeThrowError } from '@/test/factories/factory-throw-error';
import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';
jest.mock('bcrypt', () => ({
  compare() {
    return true;
  },
  hash() {
    return 'any_hash';
  },
}));
const makeSut = () => {
  const sut = new BcryptAdapter(10);
  return { sut };
};
describe('Bcrypt Adapter', () => {
  describe('compare', () => {
    it('should return true if compare return true', async () => {
      const { sut } = makeSut();
      const isValidPassword = await sut.compare(
        'any_password',
        'hashed_password',
      );
      expect(isValidPassword).toBe(true);
    });
    it('should return false if compare return false', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
      const isValidPassword = await sut.compare(
        'invalid_password',
        'hashed_password',
      );
      expect(isValidPassword).toBe(false);
    });
    it('should call bcrypt with correct params', async () => {
      const { sut } = makeSut();
      const bcryptSpy = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => false);
      await sut.compare('invalid_password', 'hashed_password');
      expect(bcryptSpy).toHaveBeenCalledWith(
        'invalid_password',
        'hashed_password',
      );
    });
    it('should throw if compare throw', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(makeThrowError);
      const isValidPassword = sut.compare(
        'invalid_password',
        'hashed_password',
      );
      expect(isValidPassword).rejects.toThrow();
    });
  });
  describe('hash', () => {
    it('should call hash with correct params', async () => {
      const { sut } = makeSut();
      const bcryptSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_password');
      expect(bcryptSpy).toHaveBeenCalledWith('any_password', 10);
    });
    it('should return a hash if success', async () => {
      const { sut } = makeSut();
      const hashedPassword = await sut.hash('any_password');
      expect(hashedPassword).toBe('any_hash');
    });
    it('should throw if hash throw', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(makeThrowError);
      const hashedPassword = sut.hash('any_password');
      expect(hashedPassword).rejects.toThrow();
    });
  });
});

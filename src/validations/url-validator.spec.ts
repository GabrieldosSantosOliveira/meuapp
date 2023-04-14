import { makeThrowError } from '@/test/factories';
import validator from 'validator';

import { UrlValidatorAdapter } from './url-validator';
jest.mock('validator', () => ({
  isURL() {
    return true;
  },
}));
const makeSut = () => {
  const sut = new UrlValidatorAdapter();
  return { sut };
};
describe('UrlValidator', () => {
  it('should return true if validator return true', async () => {
    const { sut } = makeSut();
    const isValidUrl = await sut.isValid('valid_url');
    expect(isValidUrl).toBe(true);
  });
  it('should return false if validator return false', async () => {
    const { sut } = makeSut();
    jest.spyOn(validator, 'isURL').mockImplementationOnce(() => false);
    const isValidUrl = await sut.isValid('invalid_url');
    expect(isValidUrl).toBe(false);
  });
  it('should throw if validator throw', () => {
    const { sut } = makeSut();
    jest.spyOn(validator, 'isURL').mockImplementationOnce(makeThrowError);
    expect(sut.isValid('any_url')).rejects.toThrow();
  });
});

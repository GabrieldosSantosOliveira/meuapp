import validator from 'validator';

import { EmailValidatorAdapter } from './email-validator';
jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = () => {
  const sut = new EmailValidatorAdapter();
  return { sut };
};
describe('Email Validator Adapter', () => {
  it('should return true if validator return true', () => {
    const { sut } = makeSut();
    const isValidEmail = sut.isValid('any_email@mail.com');
    expect(isValidEmail).toBe(true);
  });
  it('should return false if validator return false', () => {
    const { sut } = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValue(false);
    const isValidEmail = sut.isValid('ivalid_email@mail.com');
    expect(isValidEmail).toBe(false);
  });
  it('should call validator with correct params', () => {
    const { sut } = makeSut();
    const spyIsEmailValidator = jest.spyOn(validator, 'isEmail');
    sut.isValid('any_email@mail.com');
    expect(spyIsEmailValidator).toHaveBeenCalledWith('any_email@mail.com');
  });
});

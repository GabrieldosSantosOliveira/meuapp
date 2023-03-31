import { MissingParamError } from '@/infra/http/error';

import { ValidateMissingParamsAdapter } from './validation-missing-params';

const makeSut = () => {
  const sut = new ValidateMissingParamsAdapter();
  return { sut };
};
describe('Validation Missing Params Adapter', () => {
  it('should be return MissingParamError if no has param', () => {
    const { sut } = makeSut();
    const hasError = sut.validate(['password'], { name: 'any_name' });
    expect(hasError).toEqual(new MissingParamError('password'));
  });
  it('should be return undefined if has param', () => {
    const { sut } = makeSut();
    const hasError = sut.validate(['name'], { name: 'any_name' });
    expect(hasError).toBeUndefined();
  });
});

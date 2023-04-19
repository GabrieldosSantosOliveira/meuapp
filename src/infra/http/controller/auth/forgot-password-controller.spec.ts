import { HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import { IForgotPasswordUseCase } from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';

import {
  ForgotPasswordController,
  ForgotPasswordControllerBody,
  ForgotPasswordControllerConstructorParams,
} from './forgot-password-controller';
class ForgotPasswordUseCaseSpy implements IForgotPasswordUseCase {
  async handle(): Promise<void> {
    return;
  }
}
class ForgotPasswordUseCaseWithError implements IForgotPasswordUseCase {
  async handle(): Promise<void> {
    throw new Error();
  }
}
class ForgotPasswordUseCaseWithException implements IForgotPasswordUseCase {
  async handle(): Promise<void> {
    throw new AuthorNotFoundException();
  }
}
const makeSut = (
  params: Partial<ForgotPasswordControllerConstructorParams> = {},
) => {
  const sut = new ForgotPasswordController({
    forgotPasswordUseCase: new ForgotPasswordUseCaseSpy(),
    ...params,
  });
  return { sut };
};
const makeRequest = (
  body: Partial<ForgotPasswordControllerBody> = {},
): IHttpRequest<
  ForgotPasswordControllerBody,
  DefaultFieldType,
  DefaultFieldType
> => {
  return {
    body: { email: 'any_email@mail.com', ...body },
    params: {},
    query: {},
  };
};
describe('ForgotPasswordController', () => {
  it('should return 204 if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
  it('should return 500 if ForgotPasswordUseCase throw', async () => {
    const { sut } = makeSut({
      forgotPasswordUseCase: new ForgotPasswordUseCaseWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.SERVER_ERROR);
  });
  it('should return 404 if ForgotPasswordUseCase throw exception AuthorNotFoundException', async () => {
    const { sut } = makeSut({
      forgotPasswordUseCase: new ForgotPasswordUseCaseWithException(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut({
      forgotPasswordUseCase: new ForgotPasswordUseCaseWithException(),
    });
    const httpResponse = await sut.handle(makeRequest({ email: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});

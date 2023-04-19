import { HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import { ILoginUseCase, ILoginUseCaseResponse } from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';

import {
  LoginController,
  LoginControllerBody,
  LoginControllerConstructorParams,
} from './login-controller';
class LoginUseCaseSpy implements ILoginUseCase {
  accessToken = 'any_access_token';
  refreshToken = 'any_refresh_token';
  async handle(): Promise<ILoginUseCaseResponse> {
    return { accessToken: this.accessToken, refreshToken: this.refreshToken };
  }
}
class LoginUseCaseWithError implements ILoginUseCase {
  async handle(): Promise<ILoginUseCaseResponse> {
    throw new Error();
  }
}
class LoginUseCaseWithException implements ILoginUseCase {
  async handle(): Promise<ILoginUseCaseResponse> {
    throw new AuthorNotFoundException();
  }
}
const makeLoginUseCaseSpy = () => {
  const loginUseCaseSpy = new LoginUseCaseSpy();
  return { loginUseCaseSpy };
};
const makeSut = (params: Partial<LoginControllerConstructorParams> = {}) => {
  const { loginUseCaseSpy } = makeLoginUseCaseSpy();
  const sut = new LoginController({ loginUseCase: loginUseCaseSpy, ...params });
  return { sut, loginUseCaseSpy };
};
const makeRequest = (
  body: Partial<LoginControllerBody> = {},
): IHttpRequest<LoginControllerBody, DefaultFieldType, DefaultFieldType> => {
  return {
    body: { email: 'any_email@mail.com', password: 'any_password', ...body },
    params: {},
    query: {},
  };
};
describe('', () => {
  it('should return 400 if invalid email is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ email: 'invalid_email' }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ email: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if password is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ password: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 200 and accessToken if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.OK);
    expect(httpResponse.body).toEqual({
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
    });
  });
  it('should return 500 if LoginUseCase throw', async () => {
    const { sut } = makeSut({ loginUseCase: new LoginUseCaseWithError() });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.SERVER_ERROR);
  });
  it('should return 404 if LoginUseCase throw exception AuthorNotFoundException', async () => {
    const { sut } = makeSut({ loginUseCase: new LoginUseCaseWithException() });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});

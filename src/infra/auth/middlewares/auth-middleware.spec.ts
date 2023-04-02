import { HttpResponse, HttpStatus } from '@/helpers/http';
import { Payload } from '@/interface/auth';
import { makeAuthServiceSpy, AuthServiceSpy } from '@/test/factories';
import { UnauthorizedException } from '@/utils/http';

import { AuthMiddleware } from './auth-middleware';
class AuthServiceSpyWithError extends AuthServiceSpy {
  override decryptAccessToken(): Promise<Payload> {
    throw new UnauthorizedException();
  }
}
const makeSut = () => {
  const { authServiceSpy } = makeAuthServiceSpy();
  const sut = new AuthMiddleware({
    authService: authServiceSpy,
  });
  return { sut, authServiceSpy };
};
describe('AuthMiddleware', () => {
  it('should return 401 if accessToken is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {},
    });
    expect(httpResponse).toEqual(HttpResponse.unauthorizedError());
  });
  it('should return user if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {},
      accessToken: 'any_access_token',
    });
    expect(httpResponse).toEqual({
      user: { sub: 'any_id' },
      statusCode: HttpStatus.OK,
      body: undefined,
    });
  });
  it('should return user if error', async () => {
    const authServiceSpyWithError = new AuthServiceSpyWithError();
    const sut = new AuthMiddleware({ authService: authServiceSpyWithError });
    const httpResponse = sut.handle({
      body: {},
      accessToken: 'any_access_token',
    });
    expect(httpResponse).rejects.toThrow();
  });
});

import { Payload } from '@/interface/auth';
import { makeAuthServiceSpy, AuthServiceSpy } from '@/test/factories';
import { UnauthorizedException } from '@/utils/http';

import {
  RefreshTokenUseCase,
  RefreshTokenUseCaseConstructorParams,
} from './refresh-token-use-case';
class AuthServiceInvalidCredentials extends AuthServiceSpy {
  override decryptRefreshToken(): Promise<Payload> {
    throw new UnauthorizedException();
  }
}
const makeSut = (
  params: Partial<RefreshTokenUseCaseConstructorParams> = {},
) => {
  const { authServiceSpy } = makeAuthServiceSpy();
  const sut = new RefreshTokenUseCase({
    authService: authServiceSpy,
    ...params,
  });
  return { sut };
};
describe('RefreshTokenUseCase', () => {
  it('should return accessToken if valid refreshToken is provided', async () => {
    const { sut } = makeSut();
    const res = await sut.handle('any_refresh_token');
    expect(res).toEqual({ accessToken: 'any_access_token' });
  });
  it('should throw if invalid refreshToken is provided', async () => {
    const { sut } = makeSut({
      authService: new AuthServiceInvalidCredentials(),
    });
    expect(sut.handle('any_refresh_token')).rejects.toThrow();
  });
});

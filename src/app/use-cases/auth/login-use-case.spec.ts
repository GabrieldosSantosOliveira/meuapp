import {
  makeAuthServiceSpy,
  makeAuthor,
  makeHashAndHashComparer,
  makeInMemoryAuthorRepository,
} from '@/test/factories';
import { AuthorNotFoundException, UnauthorizedException } from '@/utils/http';

import { LoginUseCase } from './login-use-case';

const makeSut = () => {
  const { authServiceSpy } = makeAuthServiceSpy();
  const { hashAndHashComparer } = makeHashAndHashComparer();
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const sut = new LoginUseCase({
    authService: authServiceSpy,
    hashComparer: hashAndHashComparer,
    loadAuthorByEmailRepository: inMemoryAuthorRepository,
  });
  return { sut, inMemoryAuthorRepository, hashAndHashComparer, authServiceSpy };
};
describe('LoginUseCase', () => {
  it('should throw exception UnauthorizedException if invalid password is provided', async () => {
    const { sut, inMemoryAuthorRepository, hashAndHashComparer } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({ email: 'any_email', password: 'any_password' }),
    );
    hashAndHashComparer.isValidHash = false;
    expect(
      sut.handle({
        email: 'any_email',
        password: 'invalid_password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should throw exception UnauthorizedException if user no has password', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({ email: 'any_email', password: undefined }),
    );
    expect(
      sut.handle({
        email: 'any_email',
        password: 'invalid_password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should throw exception AuthorNotFoundException if user not found', async () => {
    const { sut } = makeSut();
    expect(
      sut.handle({
        email: 'invalid_email',
        password: 'any_password',
      }),
    ).rejects.toThrow(AuthorNotFoundException);
  });
  it('should return accessToken and refreshToken if email and password is valid', async () => {
    const { sut, inMemoryAuthorRepository, authServiceSpy } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({ email: 'any_email', password: 'any_password' }),
    );
    const res = await sut.handle({
      email: 'any_email',
      password: 'any_password',
    });
    expect(res).toEqual({
      accessToken: authServiceSpy.accessToken,
      refreshToken: authServiceSpy.refreshToken,
    });
  });
});

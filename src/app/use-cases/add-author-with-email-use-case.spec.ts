import { IAddAuthorWithEmailUseCaseParams } from '@/interface/index';
import {
  makeAuthor,
  makeAuthServiceSpy,
  makeHashAndHashComparer,
  makeInMemoryAuthorRepository,
} from '@/test/index';

import {
  AddAuthorWithEmailUseCase,
  AddAuthorWithEmailUseCaseParams,
} from './add-author-with-email-use-case';
const makeRequest = (
  options: Partial<IAddAuthorWithEmailUseCaseParams> = {},
): IAddAuthorWithEmailUseCaseParams => {
  return {
    email: 'any_email@gmail.com',
    firstName: 'any_first_name',
    lastName: 'any_last_name',
    password: 'any_password',
    ...options,
  };
};

const makeSut = (options: Partial<AddAuthorWithEmailUseCaseParams> = {}) => {
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const { hashAndHashComparer } = makeHashAndHashComparer();
  const { authServiceSpy } = makeAuthServiceSpy();
  const sut = new AddAuthorWithEmailUseCase({
    authService: authServiceSpy,
    createAuthorRepository: inMemoryAuthorRepository,
    loadAuthorByEmailRepository: inMemoryAuthorRepository,
    hash: hashAndHashComparer,
    ...options,
  });
  return { sut, inMemoryAuthorRepository, hashAndHashComparer };
};

describe('AddAuthorWithEmailUseCase', () => {
  it('should throw if author already exists', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({ email: 'any_email@gmail.com' }),
    );
    const createAuthor = sut.handle(
      makeRequest({ email: 'any_email@gmail.com' }),
    );
    expect(() => createAuthor).rejects.toThrow();
  });
  it('should return accessToken and refreshToken if success', async () => {
    const { sut } = makeSut();
    const createAuthor = await sut.handle(makeRequest());
    expect(createAuthor).toEqual({
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
    });
  });
  it('should save password hash in database', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await sut.handle(makeRequest({ email: 'any_email@gmail.com' }));
    const author = await inMemoryAuthorRepository.findByEmail(
      'any_email@gmail.com',
    );
    expect(author?.password).toBe('any_hash');
    expect(author?.password).not.toBe('any_password');
  });
});

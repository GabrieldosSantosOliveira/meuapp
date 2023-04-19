import { IHttpService, IHttpServiceResponse } from '@/interface/http';
import {
  makeAuthServiceSpy,
  makeAuthor,
  makeInMemoryAuthorRepository,
} from '@/test/factories';
import { UnauthorizedException } from '@/utils/http';

import {
  AddAuthorWithGoogleProviderUseCase,
  AddAuthorWithGoogleProviderUseCaseConstructorParams,
  UserGoogleResponseDto,
} from './add-author-with-google-provider-use-case';
class HttpServiceSpy implements IHttpService {
  data: UserGoogleResponseDto = {
    id: 'any_id',
    email: 'any_email',
    family_name: 'any_family_name',
    given_name: 'any_given_name',
    picture: 'any_picture',
  };
  statusCode = 200;
  async get<T = UserGoogleResponseDto>(): Promise<IHttpServiceResponse<T>> {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data: this.data,
      statusCode: this.statusCode,
    };
  }
}
class HttpServiceWithError implements IHttpService {
  async get<T = UserGoogleResponseDto>(): Promise<IHttpServiceResponse<T>> {
    throw new Error();
  }
}
const makeHttpServiceSpy = () => {
  const httpServiceSpy = new HttpServiceSpy();
  return { httpServiceSpy };
};
const makeSut = (
  params: Partial<AddAuthorWithGoogleProviderUseCaseConstructorParams> = {},
) => {
  const { authServiceSpy } = makeAuthServiceSpy();
  const { httpServiceSpy } = makeHttpServiceSpy();
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const sut = new AddAuthorWithGoogleProviderUseCase({
    authService: authServiceSpy,
    createAuthorRepository: inMemoryAuthorRepository,
    loadAuthorByEmailRepository: inMemoryAuthorRepository,
    saveAuthorRepository: inMemoryAuthorRepository,
    httpService: httpServiceSpy,
    ...params,
  });
  return { sut, httpServiceSpy, inMemoryAuthorRepository, authServiceSpy };
};
describe('AddAuthorWithGoogleProviderUseCase', () => {
  it('should return accessToken and refreshToken if success', async () => {
    const { sut, authServiceSpy } = makeSut();
    const res = await sut.handle('any_access_token');
    expect(res).toEqual({
      accessToken: authServiceSpy.accessToken,
      refreshToken: authServiceSpy.refreshToken,
    });
  });
  it('should return accessToken and refreshToken if user already exists', async () => {
    const { sut, authServiceSpy, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ email: 'any_email' }));
    const res = await sut.handle('any_access_token');
    expect(res).toEqual({
      accessToken: authServiceSpy.accessToken,
      refreshToken: authServiceSpy.refreshToken,
    });
  });
  it('should return throw if accessToken is invalid', async () => {
    const { sut } = makeSut({
      httpService: new HttpServiceWithError(),
    });
    expect(sut.handle('any_access_token')).rejects.toThrow(
      UnauthorizedException,
    );
  });
  it('should save user in database if user not exists', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await sut.handle('any_access_token');
    const user = await inMemoryAuthorRepository.findByEmail('any_email');
    expect(user).toBeTruthy();
  });
  it('should save googleId in database if user already exists', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ email: 'any_email' }));
    await sut.handle('any_access_token');
    const user = await inMemoryAuthorRepository.findByEmail('any_email');
    expect(user?.googleId).toBeTruthy();
  });
});

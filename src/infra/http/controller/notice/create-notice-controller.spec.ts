import { Notice } from '@/app/entities';
import { HttpResponse, HttpStatus } from '@/helpers/http';
import { ICreateNoticeUseCase, IHttpRequest } from '@/interface/index';
import { makeNotice } from '@/test/factories';
import { CategoryNotFoundException } from '@/utils/http';

import { NoticeViewModel } from '../../view-models';
import {
  CreateNoticeController,
  CreateNoticeControllerRequest,
  Content,
  CreateNoticeControllerConstructorParams,
} from './create-notice-controller';
class CreateNoticeUseCaseSpy implements ICreateNoticeUseCase {
  notice: Notice;
  async handle(): Promise<Notice> {
    this.notice = makeNotice();
    return this.notice;
  }
}
class CreateNoticeUseCaseWithError implements ICreateNoticeUseCase {
  notice: Notice;
  async handle(): Promise<Notice> {
    throw new Error();
  }
}
class CreateNoticeUseCaseWithException implements ICreateNoticeUseCase {
  notice: Notice;
  async handle(): Promise<Notice> {
    throw new CategoryNotFoundException();
  }
}
const makeCreateNoticeUseCaseSpy = () => {
  const createNoticeUseCaseSpy = new CreateNoticeUseCaseSpy();
  return { createNoticeUseCaseSpy };
};
const makeSut = (
  params: Partial<CreateNoticeControllerConstructorParams> = {},
) => {
  const { createNoticeUseCaseSpy } = makeCreateNoticeUseCaseSpy();
  const sut = new CreateNoticeController({
    createNoticeUseCase: createNoticeUseCaseSpy,
    ...params,
  });
  return { sut, createNoticeUseCaseSpy };
};
const makeRequest = (
  params: Partial<CreateNoticeControllerRequest> = {},
): IHttpRequest<CreateNoticeControllerRequest> => {
  return {
    params: {},
    query: {},
    body: {
      description: 'any_description',
      title: 'any_description',
      content: [{ text: 'lorem ipsum', heading: 'any_heading' }],
      image: 'https://google.com',
      category: 'any_category',
      ...params,
    },
    user: { sub: 'any_id' },
  };
};
describe('CreateNoticeController', () => {
  it('should return 400 if title is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ title: undefined }));
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if content is empty', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ content: [] }));
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if no has text in content', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ content: [{} as Content, {} as Content] }),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 500 if user is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: makeRequest().body,
      params: {},
      query: {},
    });
    expect(httpResponse.statusCode).toBe(HttpStatus.SERVER_ERROR);
  });
  it('should return notice of return CreateNoticeUseCase', async () => {
    const { sut, createNoticeUseCaseSpy } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(
      HttpResponse.created(
        NoticeViewModel.toHTTP(createNoticeUseCaseSpy.notice),
      ),
    );
  });
  it('should return 500 if CreateNoticeUseCase throw', async () => {
    const { sut } = makeSut({
      createNoticeUseCase: new CreateNoticeUseCaseWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(HttpResponse.serverError());
    expect(httpResponse.statusCode).toEqual(HttpStatus.SERVER_ERROR);
  });
  it('should return 404 if CreateNoticeUseCase throw exception CategoryNotFoundException', async () => {
    const { sut } = makeSut({
      createNoticeUseCase: new CreateNoticeUseCaseWithException(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
  });
});

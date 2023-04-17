import { Notice } from '@/app/entities';
import { HttpStatus } from '@/helpers/http';
import { ICreateNoticeUseCase, IHttpRequest } from '@/interface/index';
import { makeNotice } from '@/test/factories';

import {
  CreateNoticeController,
  CreateNoticeControllerRequest,
  Content,
} from './create-notice-controller';
class CreateNoticeUseCaseSpy implements ICreateNoticeUseCase {
  async handle(): Promise<Notice> {
    return makeNotice();
  }
}
const makeCreateNoticeUseCaseSpy = () => {
  const createNoticeUseCaseSpy = new CreateNoticeUseCaseSpy();
  return { createNoticeUseCaseSpy };
};
const makeSut = () => {
  const { createNoticeUseCaseSpy } = makeCreateNoticeUseCaseSpy();
  const sut = new CreateNoticeController({
    createNoticeUseCase: createNoticeUseCaseSpy,
  });
  return { sut };
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
      image: 'any_image',
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
  it('should return 400 if title is empty', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ title: ' ' }));
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if content is empty', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ content: [] }));
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if text in content is empty', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ content: [{ text: ' ' }] }),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if no has text in content', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ content: [{} as Content, {} as Content] }),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
});

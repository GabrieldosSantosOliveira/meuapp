import { Notice } from '@/app/entities';
import { HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import {
  IGetAllNoticeUseCase,
  IGetAllNoticeUseCaseOptions,
  IGetAllNoticeUseCaseResponse,
  Info,
} from '@/interface/use-cases';
import { makeNotice } from '@/test/factories';

import { NoticeViewModel } from '../../view-models/notice-view-model';
import {
  GetAllNoticeController,
  GetAllNoticeControllerQuery,
} from './get-all-notice-controller';
class GetAllNoticeUseCaseSpy implements IGetAllNoticeUseCase {
  notices: Notice[];
  info: Info;
  async handle(
    options: IGetAllNoticeUseCaseOptions,
  ): Promise<IGetAllNoticeUseCaseResponse> {
    this.notices = [makeNotice(), makeNotice(), makeNotice(), makeNotice()];
    this.info = {
      count: this.notices.length,
      pages: this.notices.length / options.SIZE_FOR_PAGE,
      next: null,
      prev: null,
    };
    return {
      info: this.info,
      notices: this.notices,
    };
  }
}
class GetAllNoticeUseCaseWithError implements IGetAllNoticeUseCase {
  async handle(): Promise<IGetAllNoticeUseCaseResponse> {
    throw new Error();
  }
}
const makeGetAllNoticeUseCaseSpy = () => {
  const getAllNoticeUseCaseSpy = new GetAllNoticeUseCaseSpy();
  return { getAllNoticeUseCaseSpy };
};
const makeRequest = (
  params: Partial<GetAllNoticeControllerQuery> = {},
): IHttpRequest<DefaultFieldType, GetAllNoticeControllerQuery> => {
  return {
    body: {},
    params: {},
    query: { page: 1, ...params },
  };
};
const makeSut = () => {
  const { getAllNoticeUseCaseSpy } = makeGetAllNoticeUseCaseSpy();
  const sut = new GetAllNoticeController({
    getAllNoticeUseCase: getAllNoticeUseCaseSpy,
    BASE_URL: 'http://localhost:3000',
    SIZE_FOR_PAGE: 20,
  });
  return { sut, getAllNoticeUseCaseSpy };
};
describe('GetAllNoticeController', () => {
  it('should return 200 if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.OK);
  });
  it('should return correct response of GetAllNoticeUseCase', async () => {
    const { sut, getAllNoticeUseCaseSpy } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.body).toEqual({
      data: getAllNoticeUseCaseSpy.notices.map(NoticeViewModel.toHTTP),
      info: getAllNoticeUseCaseSpy.info,
    });
  });
  it('should return 500 if GetAllNoticeUseCase throw', async () => {
    const getAllNoticeUseCaseWithError = new GetAllNoticeUseCaseWithError();
    const sut = new GetAllNoticeController({
      getAllNoticeUseCase: getAllNoticeUseCaseWithError,
      BASE_URL: 'http://localhost:3000',
      SIZE_FOR_PAGE: 20,
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.SERVER_ERROR);
  });
});

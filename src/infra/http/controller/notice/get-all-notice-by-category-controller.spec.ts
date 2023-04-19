import { Notice } from '@/app/entities';
import { HttpResponse, HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import {
  IGetAllNoticeByCategoryUseCase,
  IGetAllNoticeByCategoryUseCaseOptions,
  IGetAllNoticeByCategoryUseCaseResponse,
  Info,
} from '@/interface/use-cases';
import { makeCategory, makeNotice } from '@/test/factories';
import { MissingParamError } from '@/utils/http';

import { NoticeViewModel } from '../../view-models';
import {
  GetAllNoticeByCategoryConstructorParams,
  GetAllNoticeByCategoryController,
  GetAllNoticeByCategoryParams,
  GetAllNoticeByCategoryQuery,
} from './';
const BASE_URL = 'http://localhost:3000';
const SIZE_FOR_PAGE = 2;
class GetAllNoticeByCategoryUseCaseSpy
  implements IGetAllNoticeByCategoryUseCase
{
  notices: Notice[] = [];
  info: Info;
  async handle(
    options: IGetAllNoticeByCategoryUseCaseOptions,
  ): Promise<IGetAllNoticeByCategoryUseCaseResponse> {
    const category = makeCategory({ title: 'any_category' });
    Array.from({ length: 20 }).forEach(() => {
      this.notices.push(makeNotice({ category }));
    });
    this.notices = this.notices.filter(
      (notice) => notice.category.title === options.category,
    );
    this.info = {
      count: this.notices.length,
      next: 'next',
      pages: this.notices.length / options.SIZE_FOR_PAGE,
      prev: 'prev',
    };
    return { info: this.info, notices: this.notices };
  }
}
class GetAllNoticeByCategoryUseCaseSpyWithError
  implements IGetAllNoticeByCategoryUseCase
{
  async handle(): Promise<IGetAllNoticeByCategoryUseCaseResponse> {
    throw new Error();
  }
}
const makeGetAllNoticeByCategoryUseCaseSpy = () => {
  const getAllNoticeByCategoryUseCaseSpy =
    new GetAllNoticeByCategoryUseCaseSpy();
  return { getAllNoticeByCategoryUseCaseSpy };
};
const makeSut = (
  params: Partial<GetAllNoticeByCategoryConstructorParams> = {},
) => {
  const { getAllNoticeByCategoryUseCaseSpy } =
    makeGetAllNoticeByCategoryUseCaseSpy();
  const sut = new GetAllNoticeByCategoryController({
    BASE_URL,
    SIZE_FOR_PAGE,
    getAllNoticeByCategoryUseCase: getAllNoticeByCategoryUseCaseSpy,
    ...params,
  });
  return { sut, getAllNoticeByCategoryUseCaseSpy };
};
const makeRequest = (
  query: Partial<GetAllNoticeByCategoryQuery> = {},
  params: Partial<GetAllNoticeByCategoryParams> = {},
): IHttpRequest<
  DefaultFieldType,
  GetAllNoticeByCategoryQuery,
  GetAllNoticeByCategoryParams
> => {
  return {
    body: {},
    params: { categoryTitle: 'any_category', ...params },
    query: { page: '1', ...query },
  };
};
describe('GetAllNoticeByCategoryController', () => {
  it('should return data and info if success', async () => {
    const { sut, getAllNoticeByCategoryUseCaseSpy } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.body.data).toEqual(
      getAllNoticeByCategoryUseCaseSpy.notices.map(NoticeViewModel.toHTTP),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.OK);
  });
  it('should return 400 if categoryTitle is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ page: '1' }, { categoryTitle: undefined }),
    );
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new MissingParamError('categoryTitle').message),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 500 if GetAllNoticeByCategoryUseCase throw', async () => {
    const { sut } = makeSut({
      getAllNoticeByCategoryUseCase:
        new GetAllNoticeByCategoryUseCaseSpyWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.SERVER_ERROR);
  });
});

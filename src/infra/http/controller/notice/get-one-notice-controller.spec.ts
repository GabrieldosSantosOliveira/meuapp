import { Notice } from '@/app/entities';
import { HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import { IGetOneNoticeUseCase } from '@/interface/use-cases';
import { makeNotice } from '@/test/factories';
import { NoticeNotFoundException } from '@/utils/http';

import { NoticeViewModel } from '../../view-models';
import {
  GetOneNoticeController,
  GetOneNoticeControllerConstructorParams,
  GetOneNoticeControllerParams,
} from './get-one-notice-controller';
class GetOneNoticeControllerSpy implements IGetOneNoticeUseCase {
  notice: Notice;
  async handle(): Promise<Notice> {
    this.notice = makeNotice();
    return this.notice;
  }
}
class GetOneNoticeControllerWithError implements IGetOneNoticeUseCase {
  async handle(): Promise<Notice> {
    throw new Error();
  }
}
class GetOneNoticeControllerWithExceptionNoticeNotFound
  implements IGetOneNoticeUseCase
{
  async handle(): Promise<Notice> {
    throw new NoticeNotFoundException();
  }
}
const makeSut = (
  params: Partial<GetOneNoticeControllerConstructorParams> = {},
) => {
  const getOneNoticeControllerSpy = new GetOneNoticeControllerSpy();
  const sut = new GetOneNoticeController({
    getOneNoticeUseCase: getOneNoticeControllerSpy,
    ...params,
  });
  return { sut, getOneNoticeControllerSpy };
};
const makeRequest = (
  params: Partial<GetOneNoticeControllerParams> = {},
): IHttpRequest<
  DefaultFieldType,
  DefaultFieldType,
  GetOneNoticeControllerParams
> => {
  return {
    body: {},
    params: { id: 'any_id', ...params },
    query: {},
  };
};
describe('GetOneNoticeController', () => {
  it('should return notice if success', async () => {
    const { sut, getOneNoticeControllerSpy } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.body).toEqual(
      NoticeViewModel.toHTTP(getOneNoticeControllerSpy.notice),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.OK);
  });
  it('should return 500 if GetOneNoticeController if throw', async () => {
    const { sut } = makeSut({
      getOneNoticeUseCase: new GetOneNoticeControllerWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.SERVER_ERROR);
  });
  it('should return 404 if GetOneNoticeController if throw exception NoticeNotFoundException', async () => {
    const { sut } = makeSut({
      getOneNoticeUseCase:
        new GetOneNoticeControllerWithExceptionNoticeNotFound(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
  });
  it('should return 400 if id is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ id: undefined }));
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
});

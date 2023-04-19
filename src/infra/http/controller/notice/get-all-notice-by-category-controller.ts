import { HttpResponse } from '@/helpers/http';
import {
  IGetAllNoticeByCategoryUseCase,
  IHttpRequest,
  DefaultFieldType,
  IHttpResponse,
  Controller,
} from '@/interface/index';
import { MissingParamError } from '@/utils/http';

import { ExceptionFilter } from '../../error';
import { NoticeViewModel } from '../../view-models';
export interface GetAllNoticeByCategoryParams {
  categoryTitle: string;
}
export interface GetAllNoticeByCategoryQuery {
  page: string;
}
export interface GetAllNoticeByCategoryConstructorParams {
  getAllNoticeByCategoryUseCase: IGetAllNoticeByCategoryUseCase;
  BASE_URL: string;
  SIZE_FOR_PAGE: number;
}
export class GetAllNoticeByCategoryController implements Controller {
  constructor(
    private readonly params: GetAllNoticeByCategoryConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<
      DefaultFieldType,
      GetAllNoticeByCategoryQuery,
      GetAllNoticeByCategoryParams
    >,
  ): Promise<IHttpResponse> {
    try {
      const page = Math.max(Number(request.query.page || 1), 1);
      if (!request.params.categoryTitle) {
        return HttpResponse.badRequest(
          new MissingParamError('categoryTitle').message,
        );
      }
      const { info, notices } =
        await this.params.getAllNoticeByCategoryUseCase.handle({
          BASE_URL: this.params.BASE_URL,
          category: request.params.categoryTitle,
          page,
          SIZE_FOR_PAGE: this.params.SIZE_FOR_PAGE,
        });
      return HttpResponse.ok({
        info,
        data: notices.map(NoticeViewModel.toHTTP),
      });
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}

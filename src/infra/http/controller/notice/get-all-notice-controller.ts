import { HttpResponse } from '@/helpers/http';
import {
  Controller,
  DefaultFieldType,
  IHttpRequest,
  IHttpResponse,
  IGetAllNoticeUseCase,
} from '@/interface/index';

import { ExceptionFilter } from '../../error';
import { NoticeViewModel } from '../../view-models';
export interface GetAllNoticeControllerConstructorParams {
  getAllNoticeUseCase: IGetAllNoticeUseCase;
  BASE_URL: string;
  SIZE_FOR_PAGE: number;
}
export interface GetAllNoticeControllerQuery {
  page?: number;
}

export class GetAllNoticeController implements Controller {
  constructor(
    private readonly params: GetAllNoticeControllerConstructorParams,
  ) {}
  async handle(
    req: IHttpRequest<DefaultFieldType, GetAllNoticeControllerQuery>,
  ): Promise<IHttpResponse> {
    try {
      const page = Math.max(Number(req.query.page || 1), 1);
      const { info, notices } = await this.params.getAllNoticeUseCase.handle({
        BASE_URL: this.params.BASE_URL,
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

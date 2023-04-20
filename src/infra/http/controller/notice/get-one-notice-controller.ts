import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import {
  IHttpRequest,
  DefaultFieldType,
  IHttpResponse,
} from '@/interface/http';
import { IGetOneNoticeUseCase } from '@/interface/use-cases';
import { MissingParamError } from '@/utils/http';

import { ExceptionFilter } from '../../error';
import { NoticeViewModel } from '../../view-models';
export interface GetOneNoticeControllerParams {
  id: string;
}
export interface GetOneNoticeControllerConstructorParams {
  getOneNoticeUseCase: IGetOneNoticeUseCase;
}
export class GetOneNoticeController implements Controller {
  constructor(
    private readonly params: GetOneNoticeControllerConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<
      DefaultFieldType,
      DefaultFieldType,
      GetOneNoticeControllerParams
    >,
  ): Promise<IHttpResponse> {
    try {
      if (!request.params.id) {
        return HttpResponse.badRequest(new MissingParamError('id').message);
      }
      const notice = await this.params.getOneNoticeUseCase.handle(
        request.params.id,
      );
      return HttpResponse.ok(NoticeViewModel.toHTTP(notice));
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}

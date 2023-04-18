import { HttpResponse } from '@/helpers/http';
import {
  DefaultFieldType,
  IHttpRequest,
  IHttpResponse,
  IGetAuthorUseCase,
  Controller,
} from '@/interface/index';

import { ExceptionFilter } from '../error';
import { AuthorViewModel } from '../view-models';
export interface GetAuthorControllerParams {
  getAuthorUseCase: IGetAuthorUseCase;
}
export class GetAuthorController implements Controller {
  constructor(private readonly params: GetAuthorControllerParams) {}
  async handle(
    request: IHttpRequest<DefaultFieldType>,
  ): Promise<IHttpResponse> {
    try {
      if (!request.user?.sub) {
        return HttpResponse.serverError();
      }
      const author = await this.params.getAuthorUseCase.handle(request.user);
      return HttpResponse.ok(AuthorViewModel.toHTTP(author));
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}

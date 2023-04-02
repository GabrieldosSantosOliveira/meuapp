/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from '@/helpers/http';
import { IHttpResponse } from '@/interface/http';
import { HttpException } from '@/utils/http';

export class ExceptionFilter {
  public static handle(error: any): IHttpResponse {
    if (error instanceof HttpException) {
      return HttpResponse.customError(error.statusCode, error.error);
    }
    return HttpResponse.serverError();
  }
}

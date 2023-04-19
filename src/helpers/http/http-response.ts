import { IHttpResponse } from '@/interface/index';

import { ServerError, UnauthorizedError } from '../errors';
import { HttpStatus } from './';
export interface HttpResponseCustomErrorOptions {
  error: Error;
  cause?: Error;
}
export class HttpResponse {
  static ok(body: unknown): IHttpResponse {
    return {
      body,
      statusCode: HttpStatus.OK,
    };
  }
  static serverError(): IHttpResponse {
    return {
      statusCode: HttpStatus.SERVER_ERROR,
      body: { error: new ServerError().message },
    };
  }
  static unauthorizedError(): IHttpResponse {
    return {
      statusCode: HttpStatus.UNAUTHORIZED_ERROR,
      body: { error: new UnauthorizedError().message },
    };
  }
  static noContent(): IHttpResponse {
    return {
      body: undefined,
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
  static created(body?: unknown): IHttpResponse {
    return {
      body,
      statusCode: HttpStatus.CREATED,
    };
  }

  static badRequest(error: unknown): IHttpResponse {
    return {
      body: { error },
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  static customError(
    statusCode: number,
    options: HttpResponseCustomErrorOptions,
  ): IHttpResponse {
    return {
      body: {
        error: options.error.message,
      },
      statusCode,
    };
  }
}

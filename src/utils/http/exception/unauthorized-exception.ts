import { HttpStatus, UnauthorizedError } from '@/helpers/index';

import { HttpException } from './http-exception';

export class UnauthorizedException extends HttpException {
  constructor() {
    super({
      error: new UnauthorizedError(),
      statusCode: HttpStatus.UNAUTHORIZED_ERROR,
    });
  }
}

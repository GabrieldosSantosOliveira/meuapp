import { HttpStatus, UnauthorizedError } from '@/helpers/index';

import { HttpException } from './http-exception';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED_ERROR, {
      error: new UnauthorizedError(),
    });
  }
}

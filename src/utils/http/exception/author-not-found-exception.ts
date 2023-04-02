import { HttpStatus } from '@/helpers/http';

import { AuthorNotFoundError } from '../error';
import { HttpException } from './http-exception';

export class AuthorNotFoundException extends HttpException {
  constructor() {
    super({
      error: new AuthorNotFoundError(),
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

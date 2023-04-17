import { HttpStatus } from '@/helpers/http';

import { AuthorNotFoundError } from '../error';
import { HttpException } from './http-exception';

export class AuthorNotFoundException extends HttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, {
      error: new AuthorNotFoundError(),
    });
  }
}

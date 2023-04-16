import { HttpStatus } from '@/helpers/http';

import { CategoryNotFoundError } from '../error';
import { HttpException } from './http-exception';

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super({
      error: new CategoryNotFoundError(),
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

import { HttpStatus } from '@/helpers/http';

import { CategoryNotFoundError } from '../error';
import { HttpException } from './http-exception';

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, {
      error: new CategoryNotFoundError(),
    });
  }
}

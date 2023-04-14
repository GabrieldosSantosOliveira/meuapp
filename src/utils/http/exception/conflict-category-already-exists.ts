import { HttpStatus } from '@/helpers/http';

import { ConflictCategoryAlreadyExists } from '../error';
import { HttpException } from './http-exception';

export class ConflictCategoryAlreadyExistsException extends HttpException {
  constructor() {
    super({
      statusCode: HttpStatus.CONFLICT,
      error: new ConflictCategoryAlreadyExists(),
    });
  }
}

import { HttpStatus } from '@/helpers/http';

import { ConflictAuthorAlreadyExists } from '../error';
import { HttpException } from './http-exception';

export class ConflictAuthorAlreadyExistsException extends HttpException {
  constructor() {
    super({
      statusCode: HttpStatus.CONFLICT,
      error: new ConflictAuthorAlreadyExists(),
    });
  }
}

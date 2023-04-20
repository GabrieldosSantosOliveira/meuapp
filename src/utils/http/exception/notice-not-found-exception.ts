import { HttpStatus } from '@/helpers/http';

import { NoticeNotFoundError } from '../error';
import { HttpException } from './http-exception';

export class NoticeNotFoundException extends HttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, {
      error: new NoticeNotFoundError(),
    });
  }
}

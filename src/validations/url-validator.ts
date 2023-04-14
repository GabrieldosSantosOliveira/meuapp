import validator from 'validator';

import { UrlValidator } from '../interface';
export class UrlValidatorAdapter implements UrlValidator {
  async isValid(url: string): Promise<boolean> {
    return validator.isURL(url);
  }
}

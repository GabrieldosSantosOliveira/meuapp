import { MissingParamError } from '@/infra/http/error';
import { DefaultFieldType, ValidateMissingParams } from '@/interface/index';

export class ValidateMissingParamsAdapter implements ValidateMissingParams {
  validate<T extends DefaultFieldType>(
    params: string[],
    fields: T,
  ): Error | undefined {
    for (const param of params) {
      if (!fields[param]) {
        return new MissingParamError(param);
      }
    }
  }
}

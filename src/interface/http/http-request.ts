import { DefaultFieldType } from '../validations';

export interface IHttpRequest<T extends DefaultFieldType = DefaultFieldType> {
  body: T;
}

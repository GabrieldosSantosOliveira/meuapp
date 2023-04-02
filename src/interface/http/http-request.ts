import { Payload } from '../auth';
import { DefaultFieldType } from '../validations';

export interface IHttpRequest<T extends DefaultFieldType = DefaultFieldType> {
  body: T;
  accessToken?: string;
  user?: Payload;
}

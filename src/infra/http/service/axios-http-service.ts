/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IHttpService,
  IHttpServiceOptions,
  IHttpServiceResponse,
} from '@/interface/http';
import axios from 'axios';

export class AxiosHttpService implements IHttpService {
  async get<T = any>(
    url: string,
    options?: IHttpServiceOptions,
  ): Promise<IHttpServiceResponse<T>> {
    const { data, status } = await axios.get(url, {
      headers: { Authorization: options?.headers?.Authorization },
    });
    return { data, statusCode: status };
  }
}

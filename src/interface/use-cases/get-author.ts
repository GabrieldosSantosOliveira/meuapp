import { Author } from '@/app/entities';

import { Payload } from '../auth';

export interface IGetAuthorUseCase {
  handle(data: Payload): Promise<Author>;
}

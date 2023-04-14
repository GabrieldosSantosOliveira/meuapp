import { Author } from '../entities';

export interface RemoveAuthorRepository {
  remove: (author: Author) => Promise<void>;
}

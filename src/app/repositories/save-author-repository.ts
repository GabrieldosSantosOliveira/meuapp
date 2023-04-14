import { Author } from '../entities';

export interface SaveAuthorRepository {
  save: (author: Author) => Promise<void>;
}

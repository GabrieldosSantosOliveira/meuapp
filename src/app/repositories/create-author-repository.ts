import { Author } from '../entities';

export interface CreateAuthorRepository {
  create(author: Author): Promise<void>;
}

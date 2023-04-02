import { Author } from '../entities';

export interface LoadAuthorByIdRepository {
  findById(id: string): Promise<Author | null>;
}

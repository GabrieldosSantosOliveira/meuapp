import { Author } from '../entities';

export interface LoadAuthorByEmailRepository {
  findByEmail(email: string): Promise<Author | null>;
}

import { Author } from '@/app/entities';
import {
  LoadAuthorByIdRepository,
  RemoveAuthorRepository,
  SaveAuthorRepository,
} from '@/app/repositories';
import { CreateAuthorRepository } from '@/app/repositories/create-author-repository';
import { LoadAuthorByEmailRepository } from '@/app/repositories/load-author-by-email-repository';

export class InMemoryAuthorRepository
  implements
    LoadAuthorByEmailRepository,
    CreateAuthorRepository,
    LoadAuthorByIdRepository,
    SaveAuthorRepository,
    RemoveAuthorRepository
{
  private authors: Author[] = [];

  async remove(author: Author): Promise<void> {
    const authorsWithAuthorRemoved = this.authors.filter(
      ({ id }) => id !== author.id,
    );
    this.authors = authorsWithAuthorRemoved;
  }
  async save(author: Author): Promise<void> {
    const authorIndex = this.authors.findIndex(({ id }) => id === author.id);
    if (authorIndex >= 0) {
      this.authors[authorIndex] = author;
    }
  }
  async findById(id: string): Promise<Author | null> {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      return null;
    }
    return author;
  }
  async create(author: Author): Promise<void> {
    this.authors.push(author);
  }
  async findByEmail(email: string): Promise<Author | null> {
    const author = this.authors.find((author) => author.email === email);
    if (!author) {
      return null;
    }
    return author;
  }
}

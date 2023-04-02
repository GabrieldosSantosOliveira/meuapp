import { Author } from '@/app/entities';
import { LoadAuthorByIdRepository } from '@/app/repositories';
import { CreateAuthorRepository } from '@/app/repositories/create-author-repository';
import { LoadAuthorByEmailRepository } from '@/app/repositories/load-author-by-email-repository';

export class InMemoryAuthorRepository
  implements
    LoadAuthorByEmailRepository,
    CreateAuthorRepository,
    LoadAuthorByIdRepository
{
  async findById(id: string): Promise<Author | null> {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      return null;
    }
    return author;
  }
  private authors: Author[] = [];
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

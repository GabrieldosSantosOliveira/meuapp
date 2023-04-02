import { Author } from '@/app/entities';
import { CreateAuthorRepository } from '@/app/repositories/create-author-repository';
import { LoadAuthorByEmailRepository } from '@/app/repositories/load-author-by-email-repository';

export class InMemoryAuthorRepository
  implements LoadAuthorByEmailRepository, CreateAuthorRepository
{
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

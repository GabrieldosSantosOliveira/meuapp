import { Author } from '@/app/entities';
import { SaveAuthorRepository } from '@/app/repositories';

import { PrismaAuthorMapper } from '../mappers';
import { PrismaService } from '../prisma-service';

export class PrismaSaveAuthorRepository implements SaveAuthorRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async save(author: Author): Promise<void> {
    const rawAuthor = PrismaAuthorMapper.toPrisma(author);
    await this.prismaService.author.update({
      data: rawAuthor,
      where: {
        id: rawAuthor.id,
      },
    });
  }
}

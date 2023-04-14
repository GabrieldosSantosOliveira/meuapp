import { Author } from '@/app/entities';
import { RemoveAuthorRepository } from '@/app/repositories';

import { PrismaAuthorMapper } from '../mappers';
import { PrismaService } from '../prisma-service';

export class PrismaRemoveAuthorRepository implements RemoveAuthorRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async remove(author: Author): Promise<void> {
    const authorRaw = PrismaAuthorMapper.toPrisma(author);
    await this.prismaService.author.delete({
      where: {
        id: authorRaw.id,
      },
    });
  }
}

import { Author } from '@/app/entities';
import { LoadAuthorByIdRepository } from '@/app/repositories';

import { PrismaAuthorMapper } from '../mappers/prisma-author-mapper';
import { PrismaService } from '../prisma-service';

export class PrismaLoadAuthorByIdRepository
  implements LoadAuthorByIdRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: string): Promise<Author | null> {
    const author = await this.prismaService.author.findUnique({
      where: {
        id,
      },
    });
    if (!author) {
      return null;
    }
    return PrismaAuthorMapper.toDomain(author);
  }
}

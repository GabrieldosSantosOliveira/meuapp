import { Author } from '@/app/entities';
import { LoadAuthorByEmailRepository } from '@/app/repositories';

import { PrismaAuthorMapper } from '../mappers';
import { PrismaService } from '../prisma-service';

export class PrismaLoadAuthorByEmailRepository
  implements LoadAuthorByEmailRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<Author | null> {
    const author = await this.prismaService.author.findUnique({
      where: {
        email,
      },
    });
    if (!author) {
      return null;
    }
    return PrismaAuthorMapper.toDomain(author);
  }
}

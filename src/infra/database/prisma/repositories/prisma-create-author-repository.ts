import { Author } from '@/app/entities';
import { CreateAuthorRepository } from '@/app/repositories';

import { PrismaAuthorMapper } from '../mappers';
import { PrismaService } from '../prisma-service';

export class PrismaCreateAuthorRepository implements CreateAuthorRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(author: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(author);
    await this.prismaService.author.create({
      data: raw,
    });
  }
}

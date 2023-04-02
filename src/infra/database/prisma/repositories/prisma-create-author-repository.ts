import { Author } from '@/app/entities';
import { CreateAuthorRepository } from '@/app/repositories/create-author-repository';

import { PrismaAuthorMapper } from '../mappers/prisma-author-mapper';
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

import { Category } from '@/app/entities';
import { CreateCategoryRepository } from '@/app/repositories';

import { PrismaCategoryMapper } from '../../mappers';
import { PrismaService } from '../../prisma-service';

export class PrismaCreateCategoryRepository
  implements CreateCategoryRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async create(category: Category): Promise<void> {
    const rawCategory = PrismaCategoryMapper.toPrisma(category);
    await this.prismaService.category.create({
      data: rawCategory,
    });
  }
}

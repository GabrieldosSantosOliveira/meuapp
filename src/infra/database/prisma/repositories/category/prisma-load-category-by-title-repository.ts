import { Category } from '@/app/entities';
import { LoadCategoryByTitleRepository } from '@/app/repositories';

import { PrismaCategoryMapper } from '../../mappers';
import { PrismaService } from '../../prisma-service';

export class PrismaLoadCategoryByTitleRepository
  implements LoadCategoryByTitleRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async findByTitle(title: string): Promise<Category | null> {
    const category = await this.prismaService.category.findUnique({
      where: { title },
    });
    if (!category) {
      return null;
    }
    return PrismaCategoryMapper.toDomain(category);
  }
}

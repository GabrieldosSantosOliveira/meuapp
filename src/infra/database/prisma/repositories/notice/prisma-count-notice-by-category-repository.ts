import { Category } from '@/app/entities';
import { CountNoticeByCategoryRepository } from '@/app/repositories';

import { PrismaCategoryMapper } from '../../mappers';
import { PrismaService } from '../../prisma-service';

export class PrismaCountNoticeByCategoryRepository
  implements CountNoticeByCategoryRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async countByCategory(category: Category): Promise<number> {
    const rawCategory = PrismaCategoryMapper.toPrisma(category);
    const countByCategory = await this.prismaService.notice.count({
      where: { categoryId: rawCategory.id },
    });
    return countByCategory;
  }
}

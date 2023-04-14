import { Category } from '@/app/entities';
import { Category as RawCategory } from '@prisma/client';
export class PrismaCategoryMapper {
  static toPrisma(category: Category): RawCategory {
    return {
      createdAt: category.createdAt,
      id: category.id,
      title: category.title,
      updatedAt: category.updatedAt,
    };
  }
  static toDomain(rawCategory: RawCategory): Category {
    return new Category({
      title: rawCategory.title,
      createdAt: rawCategory.createdAt,
      id: rawCategory.id,
      updatedAt: rawCategory.updatedAt,
    });
  }
}

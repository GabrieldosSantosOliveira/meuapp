import { Category } from '@/app/entities';

export class CategoryViewModel {
  public static toHTTP(category: Category) {
    return {
      id: category.id,
      title: category.title,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}

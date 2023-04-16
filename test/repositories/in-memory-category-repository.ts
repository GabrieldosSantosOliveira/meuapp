import { Category } from '@/app/entities';
import {
  CreateCategoryRepository,
  LoadCategoryByTitleRepository,
} from '@/app/repositories';

export class InMemoryCategoryRepository
  implements LoadCategoryByTitleRepository, CreateCategoryRepository
{
  private categorys: Category[] = [];

  async create(category: Category): Promise<void> {
    this.categorys.push(category);
  }
  async findByTitle(title: string): Promise<Category | null> {
    const category = this.categorys.find(
      (category) => category.title === title,
    );
    if (!category) {
      return null;
    }
    return category;
  }
}

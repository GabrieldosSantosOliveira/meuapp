import { Category } from '../entities';

export interface LoadCategoryByTitleRepository {
  findByTitle(title: string): Promise<Category | null>;
}

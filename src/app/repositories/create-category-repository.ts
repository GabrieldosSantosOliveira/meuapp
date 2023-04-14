import { Category } from '../entities';

export interface CreateCategoryRepository {
  create(category: Category): Promise<void>;
}

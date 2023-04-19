import { Category } from '../entities';

export interface CountNoticeByCategoryRepository {
  countByCategory(category: Category): Promise<number>;
}

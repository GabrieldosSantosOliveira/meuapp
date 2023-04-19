import { Category, Notice } from '../entities';
export interface LoadAllNoticeByCategoryRepositoryOptions {
  page: number;
  sizeForPage: number;
  category: Category;
}
export interface LoadAllNoticeByCategoryRepository {
  findAllByCategoryByPage(
    options: LoadAllNoticeByCategoryRepositoryOptions,
  ): Promise<Notice[]>;
}

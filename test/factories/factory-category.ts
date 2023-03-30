import { Category, CategoryProps } from '@/app/entities';
export const makeCategory = (category: Partial<CategoryProps> = {}) => {
  return new Category({
    title: 'any_title',
    ...category,
  });
};

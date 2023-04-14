import { InMemoryCategoryRepository } from '../repositories';

export const makeInMemoryCategoryRepository = () => {
  const inMemoryCategoryRepository = new InMemoryCategoryRepository();
  return { inMemoryCategoryRepository };
};

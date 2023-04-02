import { InMemoryAuthorRepository } from '../repositories';

export const makeInMemoryAuthorRepository = () => {
  const inMemoryAuthorRepository = new InMemoryAuthorRepository();
  return { inMemoryAuthorRepository };
};

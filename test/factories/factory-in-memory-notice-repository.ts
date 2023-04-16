import { InMemoryNoticeRepository } from '../repositories';

export const makeInMemoryNoticeRepository = () => {
  const inMemoryNoticeRepository = new InMemoryNoticeRepository();
  return { inMemoryNoticeRepository };
};

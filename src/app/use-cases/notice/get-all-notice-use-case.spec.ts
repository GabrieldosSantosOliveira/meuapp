import { makeInMemoryNoticeRepository, makeNotice } from '@/test/factories';

import { GetAllNoticeUseCase } from './get-all-notice-use-case';

const makeSut = () => {
  const { inMemoryNoticeRepository } = makeInMemoryNoticeRepository();
  const sut = new GetAllNoticeUseCase({
    loadAllNoticeRepository: inMemoryNoticeRepository,
    countNoticeRepository: inMemoryNoticeRepository,
  });
  return {
    sut,
    inMemoryNoticeRepository,
  };
};
const BASE_URL = 'http://localhost:3000';
const SIZE_FOR_PAGE = 20;
describe('GetAllNoticeUseCase', () => {
  it('should return all notices if success', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    await inMemoryNoticeRepository.create(makeNotice());
    await inMemoryNoticeRepository.create(makeNotice());
    await inMemoryNoticeRepository.create(makeNotice());
    await inMemoryNoticeRepository.create(makeNotice());
    const notices = await sut.handle({ page: 1, BASE_URL, SIZE_FOR_PAGE });
    expect(notices.notices.length).toBe(4);
  });
});

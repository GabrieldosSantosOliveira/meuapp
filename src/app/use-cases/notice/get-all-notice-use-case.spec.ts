import { makeInMemoryNoticeRepository, makeNotice } from '@/test/factories';

import { GetAllNoticeUseCase } from './get-all-notice-use-case';

const makeSut = () => {
  const { inMemoryNoticeRepository } = makeInMemoryNoticeRepository();
  const sut = new GetAllNoticeUseCase({
    loadAllNoticeRepository: inMemoryNoticeRepository,
  });
  return {
    sut,
    inMemoryNoticeRepository,
  };
};
describe('GetAllNoticeUseCase', () => {
  it('should return all notices if success', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    await inMemoryNoticeRepository.create(makeNotice());
    await inMemoryNoticeRepository.create(makeNotice());
    await inMemoryNoticeRepository.create(makeNotice());
    await inMemoryNoticeRepository.create(makeNotice());
    const notices = await sut.handle();
    expect(notices.length).toBe(4);
  });
});

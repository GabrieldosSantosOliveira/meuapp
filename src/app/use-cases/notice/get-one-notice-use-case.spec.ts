import { makeInMemoryNoticeRepository, makeNotice } from '@/test/factories';
import { NoticeNotFoundException } from '@/utils/http';

import { GetOneNoticeUseCase } from './get-one-notice-use-case';

const makeSut = () => {
  const { inMemoryNoticeRepository } = makeInMemoryNoticeRepository();
  const sut = new GetOneNoticeUseCase({
    loadNoticeByIdRepository: inMemoryNoticeRepository,
  });
  return { sut, inMemoryNoticeRepository };
};
describe('GetOneNoticeUseCase', () => {
  it('should throw exception NoticeNotFoundException if notice not found', async () => {
    const { sut } = makeSut();
    await expect(sut.handle('any_id')).rejects.toThrow(NoticeNotFoundException);
  });
  it('should return notice if success', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    await inMemoryNoticeRepository.create(makeNotice({ id: 'any_id' }));
    const notice = await sut.handle('any_id');
    const noticeInDatabase = await inMemoryNoticeRepository.findById('any_id');
    expect(notice).toEqual(noticeInDatabase);
  });
});

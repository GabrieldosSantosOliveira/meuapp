import { IGetAllNoticeUseCaseOptions } from '@/interface/use-cases';
import { makeInMemoryNoticeRepository, makeNotice } from '@/test/factories';

import { GetAllNoticeUseCase } from './';

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
const makeRequest = (
  params: Partial<IGetAllNoticeUseCaseOptions> = {},
): IGetAllNoticeUseCaseOptions => {
  return {
    page: 1,
    BASE_URL,
    SIZE_FOR_PAGE: 2,
    ...params,
  };
};
describe('GetAllNoticeUseCase', () => {
  it('should return all notices if success', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    Array.from({ length: 4 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice());
    });
    const notices = await sut.handle(makeRequest());
    expect(notices.notices.length).toBe(2);
  });

  it('should return info and notices if success', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    await inMemoryNoticeRepository.create(makeNotice());
    const res = await sut.handle(makeRequest());
    expect(res.notices.length).toBe(1);
    expect(res.info).toBeTruthy();
  });
  it('should return null next info if is last page', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    await inMemoryNoticeRepository.create(makeNotice());
    const res = await sut.handle(makeRequest());
    expect(res.info.next).toBeNull();
  });
  it('should return null prev info if is first page', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    await inMemoryNoticeRepository.create(makeNotice());
    const res = await sut.handle(makeRequest());
    expect(res.info.prev).toBeNull();
  });
  it('should return correct count info', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice());
    });
    const res = await sut.handle(makeRequest());
    expect(res.info.count).toBe(20);
  });
  it('should return correct total pages', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();

    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice());
    });
    const res = await sut.handle(makeRequest());
    expect(res.info.pages).toBe(10);
  });
  it('should return url prev info if is second page', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice());
    });
    const res = await sut.handle(makeRequest({ page: 2 }));

    expect(res.info.prev).toBeTruthy();
  });
  it('should return url next info if is second page', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();

    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice());
    });
    const res = await sut.handle(makeRequest({ page: 2 }));

    expect(res.info.next).toBeTruthy();
  });
  it('should return null prev info if page is greater than total pages', async () => {
    const { sut, inMemoryNoticeRepository } = makeSut();
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice());
    });
    const res = await sut.handle(makeRequest({ page: 11 }));
    expect(res.info.prev).toBeNull();
  });
});

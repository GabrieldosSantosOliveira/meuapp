import { IGetAllNoticeByCategoryUseCaseOptions } from '@/interface/use-cases';
import {
  makeCategory,
  makeInMemoryCategoryRepository,
  makeInMemoryNoticeRepository,
  makeNotice,
} from '@/test/factories';
import { CategoryNotFoundException } from '@/utils/http';

import { GetAllNoticeByCategoryUseCase } from './';
const makeSut = () => {
  const { inMemoryNoticeRepository } = makeInMemoryNoticeRepository();
  const { inMemoryCategoryRepository } = makeInMemoryCategoryRepository();
  const sut = new GetAllNoticeByCategoryUseCase({
    countNoticeByCategoryRepository: inMemoryNoticeRepository,
    loadAllNoticeByCategoryRepository: inMemoryNoticeRepository,
    loadCategoryByTitleRepository: inMemoryCategoryRepository,
  });
  return {
    sut,
    inMemoryCategoryRepository,
    inMemoryNoticeRepository,
  };
};
const makeRequest = (
  params: Partial<IGetAllNoticeByCategoryUseCaseOptions> = {},
): IGetAllNoticeByCategoryUseCaseOptions => {
  return {
    BASE_URL: 'http://localhost',
    category: 'any_category',
    page: 1,
    SIZE_FOR_PAGE: 2,
    ...params,
  };
};
describe('GetAllNoticeByCategoryUseCase', () => {
  it('should throw if category not found', async () => {
    const { sut } = makeSut();
    await expect(sut.handle(makeRequest())).rejects.toThrow(
      CategoryNotFoundException,
    );
  });
  it('should return info and notices if success', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    await inMemoryNoticeRepository.create(makeNotice({ category }));
    const res = await sut.handle(makeRequest({ category: 'any_category' }));
    expect(res.notices.length).toBe(1);
    expect(res.info).toBeTruthy();
  });
  it('should return null next info if is last page', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    await inMemoryNoticeRepository.create(makeNotice({ category }));
    const res = await sut.handle(makeRequest({ category: 'any_category' }));
    expect(res.info.next).toBeNull();
  });
  it('should return null prev info if is first page', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    await inMemoryNoticeRepository.create(makeNotice({ category }));
    const res = await sut.handle(makeRequest({ category: 'any_category' }));
    expect(res.info.prev).toBeNull();
  });
  it('should return null prev info if page is greater than total pages', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice({ category }));
    });
    const res = await sut.handle(
      makeRequest({ category: 'any_category', page: 11 }),
    );
    expect(res.info.prev).toBeNull();
  });
  it('should return correct count', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice({ category }));
    });
    const res = await sut.handle(makeRequest({ category: 'any_category' }));
    expect(res.info.count).toBe(20);
  });
  it('should return correct total pages info', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice({ category }));
    });
    const res = await sut.handle(makeRequest({ category: 'any_category' }));
    expect(res.info.pages).toBe(10);
  });
  it('should return notices with correct category', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice({ category }));
    });
    const res = await sut.handle(makeRequest({ category: 'any_category' }));

    expect(
      res.notices.filter((notice) => notice.category.id === category.id).length,
    ).toBe(2);
  });
  it('should return url prev info if is second page', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice({ category }));
    });
    const res = await sut.handle(
      makeRequest({ category: 'any_category', page: 2 }),
    );

    expect(res.info.prev).toBeTruthy();
  });
  it('should return url next info if is second page', async () => {
    const { sut, inMemoryCategoryRepository, inMemoryNoticeRepository } =
      makeSut();
    const category = makeCategory({ title: 'any_category' });
    await inMemoryCategoryRepository.create(category);
    Array.from({ length: 20 }).forEach(async () => {
      await inMemoryNoticeRepository.create(makeNotice({ category }));
    });
    const res = await sut.handle(
      makeRequest({ category: 'any_category', page: 2 }),
    );

    expect(res.info.next).toBeTruthy();
  });
});

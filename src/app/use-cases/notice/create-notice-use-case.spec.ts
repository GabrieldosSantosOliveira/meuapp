import { Notice } from '@/app/entities';
import { ICreateNoticeUseCaseParams } from '@/interface/use-cases';
import {
  makeAuthor,
  makeCategory,
  makeInMemoryAuthorRepository,
  makeInMemoryCategoryRepository,
  makeInMemoryNoticeRepository,
} from '@/test/factories';
import {
  AuthorNotFoundException,
  CategoryNotFoundException,
} from '@/utils/http';

import { CreateNoticeUseCase } from './create-notice-use-case';
const makeRequest = (
  params: Partial<ICreateNoticeUseCaseParams> = {},
): ICreateNoticeUseCaseParams => {
  return {
    category: 'Esporte',
    content: [{ text: 'any_text' }],
    description: 'any_description',
    image: 'any_image',
    title: 'any_title',
    user: { sub: 'any_user' },
    ...params,
  };
};
const makeSut = () => {
  const { inMemoryCategoryRepository } = makeInMemoryCategoryRepository();
  const { inMemoryNoticeRepository } = makeInMemoryNoticeRepository();
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const sut = new CreateNoticeUseCase({
    createNoticeRepository: inMemoryNoticeRepository,
    loadAuthorByIdRepository: inMemoryAuthorRepository,
    loadCategoryByTitleRepository: inMemoryCategoryRepository,
  });
  return {
    sut,
    inMemoryAuthorRepository,
    inMemoryCategoryRepository,
    inMemoryNoticeRepository,
  };
};
describe('CreateNoticeUseCase', () => {
  it('should return Notice if success', async () => {
    const { sut, inMemoryAuthorRepository, inMemoryCategoryRepository } =
      makeSut();
    inMemoryAuthorRepository.create(makeAuthor({ id: 'any_id' }));
    inMemoryCategoryRepository.create(makeCategory({ title: 'Esporte' }));
    const notice = await sut.handle(
      makeRequest({ user: { sub: 'any_id' }, category: 'Esporte' }),
    );
    expect(notice).toBeInstanceOf(Notice);
  });
  it('should throw CategoryNotFoundException if category not found', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    inMemoryAuthorRepository.create(makeAuthor({ id: 'any_id' }));
    const notice = sut.handle(makeRequest({ user: { sub: 'any_id' } }));
    expect(notice).rejects.toThrow(CategoryNotFoundException);
  });
  it('should throw AuthorNotFoundException if author not found', async () => {
    const { sut, inMemoryCategoryRepository } = makeSut();
    inMemoryCategoryRepository.create(makeCategory({ title: 'Esporte' }));
    const notice = sut.handle(makeRequest({ category: 'Esporte' }));
    expect(notice).rejects.toThrow(AuthorNotFoundException);
  });
});

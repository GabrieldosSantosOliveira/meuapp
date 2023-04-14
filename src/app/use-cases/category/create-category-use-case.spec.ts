import { Category } from '@/app/entities';
import { makeCategory, makeInMemoryCategoryRepository } from '@/test/factories';

import { CreateCategoryUseCase } from './create-category-use-case';

const makeSut = () => {
  const { inMemoryCategoryRepository } = makeInMemoryCategoryRepository();
  const sut = new CreateCategoryUseCase({
    createCategoryRepository: inMemoryCategoryRepository,
    loadCategoryByTitleRepository: inMemoryCategoryRepository,
  });
  return { sut, inMemoryCategoryRepository };
};
describe('CreateCategoryUseCase', () => {
  it('should throw if category already exists', async () => {
    const { sut, inMemoryCategoryRepository } = makeSut();
    const category = makeCategory();
    await inMemoryCategoryRepository.create(category);
    await expect(sut.handle({ title: category.title })).rejects.toThrow();
  });
  it('should return category if success', async () => {
    const { sut } = makeSut();
    const category = await sut.handle({ title: 'any_title' });
    expect(category).toBeInstanceOf(Category);
  });
});

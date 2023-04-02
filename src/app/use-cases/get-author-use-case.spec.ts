import { makeAuthor, makeInMemoryAuthorRepository } from '@/test/factories';

import { GetAuthorUseCase } from './get-author-use-case';

const makeSut = () => {
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const sut = new GetAuthorUseCase({
    loadAuthorByIdRepository: inMemoryAuthorRepository,
  });
  return { sut, inMemoryAuthorRepository };
};
describe('GetAuthorUseCase', () => {
  it('should throw if author not found', () => {
    const { sut } = makeSut();
    const author = sut.handle({
      sub: 'any_sub',
    });
    expect(author).rejects.toThrow();
  });
  it('should return author if success', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    inMemoryAuthorRepository.create(makeAuthor({ id: 'any_sub' }));
    const author = await sut.handle({
      sub: 'any_sub',
    });
    const authorInDatabase = await inMemoryAuthorRepository.findById('any_sub');
    expect(author).toEqual(authorInDatabase);
  });
});

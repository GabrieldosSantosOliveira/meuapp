import { makeAuthor, makeInMemoryAuthorRepository } from '@/test/factories';

import { RemoveAuthorUseCase } from './remove-author-use-case';

const makeSut = () => {
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const sut = new RemoveAuthorUseCase({
    loadAuthorByIdRepository: inMemoryAuthorRepository,
    removeAuthorRepository: inMemoryAuthorRepository,
  });
  return { sut, inMemoryAuthorRepository };
};
describe('RemoveAuthorUseCase', () => {
  it('should throw if author not exists', async () => {
    const { sut } = makeSut();
    expect(sut.handle('any_id')).rejects.toThrow();
  });
  it('should remove author if success', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ id: 'any_id' }));
    await sut.handle('any_id');
    const hasAuthor = await inMemoryAuthorRepository.findById('any_id');
    expect(hasAuthor).toBeNull();
  });
});

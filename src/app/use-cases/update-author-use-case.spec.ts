import { makeAuthor, makeInMemoryAuthorRepository } from '@/test/factories';

import { UpdateAuthorUseCase } from './update-author-use-case';

const makeSut = () => {
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const sut = new UpdateAuthorUseCase({
    loadAuthorByIdRepository: inMemoryAuthorRepository,
    saveAuthorRepository: inMemoryAuthorRepository,
  });
  return { sut, inMemoryAuthorRepository };
};
describe('UpdateAuthorUseCase', () => {
  it('should throw if not found author', async () => {
    const { sut } = makeSut();
    const response = sut.handle({
      user: { sub: 'any' },
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      picture: 'any_picture',
    });
    expect(response).rejects.toThrow();
  });
  it('should update author if success', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ id: 'any_id' }));

    await sut.handle({
      user: { sub: 'any_id' },
      firstName: 'update_first_name',
      lastName: 'update_last_name',
      picture: 'update_picture',
    });
    const author = await inMemoryAuthorRepository.findById('any_id');
    expect(author?.picture).toEqual('update_picture');
  });
});

import { IUpdateAuthorUseCaseParams } from '@/interface/use-cases';
import {
  makeAuthor,
  makeDateWithLessTwoHours,
  makeInMemoryAuthorRepository,
} from '@/test/factories';

import { Author } from '../entities';
import { UpdateAuthorUseCase } from './update-author-use-case';
const makeRequest = (
  params: Partial<IUpdateAuthorUseCaseParams> = {},
): IUpdateAuthorUseCaseParams => {
  return {
    user: { sub: 'any' },
    firstName: 'any_first_name',
    lastName: 'any_last_name',
    picture: 'any_picture',
    ...params,
  };
};
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
    const response = sut.handle(makeRequest());
    expect(response).rejects.toThrow();
  });
  it('should update author if success', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ id: 'any_id' }));

    await sut.handle(
      makeRequest({ user: { sub: 'any_id' }, picture: 'update_picture' }),
    );
    const author = await inMemoryAuthorRepository.findById('any_id');
    expect(author?.picture).toEqual('update_picture');
  });
  it('should  update updateAt if success', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({
        id: 'any_id',
        updatedAt: makeDateWithLessTwoHours(),
        createdAt: makeDateWithLessTwoHours(),
      }),
    );
    await sut.handle(makeRequest({ user: { sub: 'any_id' } }));
    const authorAfterUpdate = (await inMemoryAuthorRepository.findById(
      'any_id',
    )) as Author;
    const updatedAtIsUpdate =
      authorAfterUpdate?.updatedAt > makeDateWithLessTwoHours();
    expect(updatedAtIsUpdate).toBe(true);
  });
});

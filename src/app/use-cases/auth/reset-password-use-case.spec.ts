import {
  makeAuthor,
  makeDateWithLessTwoHours,
  makeDateWithMoreTwoHours,
  makeHashAndHashComparer,
  makeInMemoryAuthorRepository,
} from '@/test/factories';
import { UnauthorizedException } from '@/utils/http';

import { ResetPasswordUseCase } from './reset-password-use-case';

const makeSut = () => {
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const { hashAndHashComparer } = makeHashAndHashComparer();
  const sut = new ResetPasswordUseCase({
    loadAuthorByEmailRepository: inMemoryAuthorRepository,
    saveAuthorRepository: inMemoryAuthorRepository,
    hash: hashAndHashComparer,
  });
  return { sut, hashAndHashComparer, inMemoryAuthorRepository };
};
describe('ResetPasswordUseCase', () => {
  it('should throw if resetPasswordToken is not valid', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({
        email: 'any_email',
        resetPasswordToken: 'any_token',
        resetPasswordExpires: new Date(),
      }),
    );
    await expect(
      sut.handle({
        email: 'any_email',
        passwordReset: 'any_reset_password',
        resetPasswordToken: 'invalid_token',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should throw if expires resetPasswordExpires', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({
        email: 'any_email',
        resetPasswordToken: 'any_token',
        resetPasswordExpires: makeDateWithLessTwoHours(),
      }),
    );
    await expect(
      sut.handle({
        email: 'any_email',
        passwordReset: 'any_reset_password',
        resetPasswordToken: 'any_token',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should throw if author no has resetPasswordToken or resetPasswordExpires', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({
        email: 'any_email',
      }),
    );
    await expect(
      sut.handle({
        email: 'any_email',
        passwordReset: 'any_reset_password',
        resetPasswordToken: 'any_token',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should update password if success', async () => {
    const { sut, inMemoryAuthorRepository, hashAndHashComparer } = makeSut();
    await inMemoryAuthorRepository.create(
      makeAuthor({
        email: 'any_email',
        resetPasswordToken: 'any_token',
        resetPasswordExpires: makeDateWithMoreTwoHours(),
      }),
    );
    await sut.handle({
      email: 'any_email',
      passwordReset: 'any_reset_password',
      resetPasswordToken: 'any_token',
    });
    const authorAfterUpdate = await inMemoryAuthorRepository.findByEmail(
      'any_email',
    );
    expect(authorAfterUpdate?.password).toBe(hashAndHashComparer.hashText);
  });
});

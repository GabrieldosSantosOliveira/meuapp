import { IMailProvider, SendEmailData } from '@/interface/mail';
import { IServiceRandomNumber } from '@/interface/service';
import { makeAuthor, makeInMemoryAuthorRepository } from '@/test/factories';
import { AuthorNotFoundException } from '@/utils/http';

import { ForgotPasswordUseCase } from './forgot-password-use-case';
class MailProviderSpy implements IMailProvider {
  data: SendEmailData;
  async sendEmail(data: SendEmailData): Promise<void> {
    this.data = data;
  }
}
class ServiceRandomNumber implements IServiceRandomNumber {
  randomNumber = 9999999;
  generateRandomNumber(): number {
    return this.randomNumber;
  }
}
const makeSut = () => {
  const { inMemoryAuthorRepository } = makeInMemoryAuthorRepository();
  const mailProviderSpy = new MailProviderSpy();
  const serviceRandomNumber = new ServiceRandomNumber();
  const sut = new ForgotPasswordUseCase({
    loadAuthorByEmailRepository: inMemoryAuthorRepository,
    saveAuthorRepository: inMemoryAuthorRepository,
    mailProvider: mailProviderSpy,
    serviceRandomNumber,
  });
  return {
    sut,
    serviceRandomNumber,
    mailProviderSpy,
    inMemoryAuthorRepository,
  };
};
describe('ForgotPasswordUseCase', () => {
  it('should send mail for reset password if success', async () => {
    const { sut, inMemoryAuthorRepository, mailProviderSpy } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ email: 'any_email' }));
    const res = await sut.handle({ email: 'any_email' });
    expect(res).toBeFalsy();
    expect(mailProviderSpy.data).toBeTruthy();
  });
  it('should save resetPasswordToken and resetPasswordExpires in database if success', async () => {
    const { sut, inMemoryAuthorRepository } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ email: 'any_email' }));
    const res = await sut.handle({ email: 'any_email' });
    const userAfterSave = await inMemoryAuthorRepository.findByEmail(
      'any_email',
    );
    expect(res).toBeFalsy();
    const nowDate = new Date();
    const resetPasswordExpiresHasMoreTwoHours =
      nowDate < (userAfterSave?.resetPasswordExpires || nowDate);
    expect(userAfterSave?.resetPasswordExpires).toBeTruthy();
    expect(resetPasswordExpiresHasMoreTwoHours).toBe(true);
  });
  it('should send mail to correct email if success', async () => {
    const { sut, inMemoryAuthorRepository, mailProviderSpy } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ email: 'any_email' }));
    await sut.handle({ email: 'any_email' });
    expect(mailProviderSpy.data.to).toBe('any_email');
  });
  it('should throw exception AuthorNotFoundException if author not found', async () => {
    const { sut } = makeSut();
    expect(sut.handle({ email: 'any_email' })).rejects.toThrow(
      AuthorNotFoundException,
    );
  });
  it('should save correct resetPasswordToken in database if success', async () => {
    const { sut, inMemoryAuthorRepository, serviceRandomNumber } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ email: 'any_email' }));
    await sut.handle({ email: 'any_email' });
    const userAfterSave = await inMemoryAuthorRepository.findByEmail(
      'any_email',
    );
    expect(userAfterSave?.resetPasswordToken).toBe(
      String(serviceRandomNumber.randomNumber),
    );
  });
  it('should send mail with correct resetPasswordToken', async () => {
    const {
      sut,
      inMemoryAuthorRepository,
      mailProviderSpy,
      serviceRandomNumber,
    } = makeSut();
    await inMemoryAuthorRepository.create(makeAuthor({ email: 'any_email' }));
    await sut.handle({ email: 'any_email' });

    expect(
      mailProviderSpy.data.body.includes(
        String(serviceRandomNumber.randomNumber),
      ),
    ).toBe(true);
  });
});

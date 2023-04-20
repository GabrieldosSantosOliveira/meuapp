import {
  LoadAuthorByEmailRepository,
  SaveAuthorRepository,
} from '@/app/repositories';
import { IMailProvider } from '@/interface/mail/mail-provider';
import { IServiceRandomNumber } from '@/interface/service';
import {
  IForgotPasswordUseCase,
  IForgotPasswordUseCaseParams,
} from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';
export interface ForgotPasswordUseCaseConstructorParams {
  mailProvider: IMailProvider;
  loadAuthorByEmailRepository: LoadAuthorByEmailRepository;
  serviceRandomNumber: IServiceRandomNumber;
  saveAuthorRepository: SaveAuthorRepository;
}
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly params: ForgotPasswordUseCaseConstructorParams,
  ) {}
  async handle(data: IForgotPasswordUseCaseParams): Promise<void> {
    const authorExists =
      await this.params.loadAuthorByEmailRepository.findByEmail(data.email);
    if (!authorExists) {
      throw new AuthorNotFoundException();
    }
    authorExists.resetPasswordToken = String(
      this.params.serviceRandomNumber.generateRandomNumber({ length: 6 }),
    );
    const nowDate = new Date();
    const resetPasswordExpires = nowDate.setHours(nowDate.getHours() + 2);
    authorExists.resetPasswordExpires = new Date(resetPasswordExpires);
    authorExists.updatedAt = new Date();
    await this.params.saveAuthorRepository.save(authorExists);
    await this.params.mailProvider.sendEmail({
      from: {
        name: 'Equipe de suporte',
        email: 'no_reply@blog.com.br',
      },
      to: data.email,
      body: this.generateBodyResetPassword(authorExists.resetPasswordToken),
      subject: 'Esqueceu a senha',
    });
  }
  generateBodyResetPassword(resetPasswordToken: string) {
    return `<div><p>Parece que você esqueceu sua senha. Se isso for verdade, insira o código de verificação abaixo para redefinir sua senha.</p><h1>${resetPasswordToken}</h1></div>`;
  }
}

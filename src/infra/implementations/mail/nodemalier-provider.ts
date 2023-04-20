import { IMailProvider, SendEmailData } from '@/interface/mail';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
interface MailConfig {
  transport?: SMTPTransport | SMTPTransport.Options | string;
  defaults?: SMTPTransport.Options;
}
export class NodeMailerProvider implements IMailProvider {
  private transporter: Transporter;
  constructor(mailConfig: MailConfig) {
    this.transporter = createTransport(
      mailConfig.transport,
      mailConfig.defaults,
    );
  }
  async sendEmail(data: SendEmailData): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: data.from.name,
        address: data.from.email,
      },
      to: data.to,
      subject: data.subject,
      html: data.body,
    });
  }
}

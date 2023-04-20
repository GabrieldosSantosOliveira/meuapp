export interface SendEmailData {
  to: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  body: string;
}

export abstract class IMailProvider {
  abstract sendEmail(data: SendEmailData): Promise<void>;
}

/* eslint-disable @typescript-eslint/no-var-requires */

import { makeThrowError } from '@/test/factories';

import { NodeMailerProvider } from './nodemalier-provider';

jest.mock('nodemailer');
const nodemailer = require('nodemailer');
const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

const makeSut = () => {
  const sut = new NodeMailerProvider({});
  return { sut };
};
const sendMailOptions = {
  body: 'any_body',
  from: {
    email: 'any_mail',
    name: 'any_name',
  },
  subject: 'any_subject',
  to: 'any_to',
};
describe('NodeMailerProvider', () => {
  beforeEach(() => {
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
  });
  it('should call nodemailer with correct params', async () => {
    const { sut } = makeSut();
    await sut.sendEmail(sendMailOptions);
    expect(sendMailMock).toHaveBeenCalledWith({
      from: {
        name: sendMailOptions.from.name,
        address: sendMailOptions.from.email,
      },
      to: sendMailOptions.to,
      subject: sendMailOptions.subject,
      html: sendMailOptions.body,
    });
  });
  it('should throw if nodemailer throw', async () => {
    const { sut } = makeSut();
    sendMailMock.mockImplementation(makeThrowError);
    expect(sut.sendEmail(sendMailOptions)).rejects.toThrow();
  });
  it('should return void if success', async () => {
    const { sut } = makeSut();
    sendMailMock.mockReturnValueOnce('ok');
    const resMail = await sut.sendEmail(sendMailOptions);
    expect(resMail).toBeFalsy();
  });
});

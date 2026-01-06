import { Injectable, Logger } from '@nestjs/common';
// import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { MailClient } from '../interfaces/mail-client.interface';
import * as nodemailer from 'nodemailer';
import { AppConfig } from 'src/config/config';
const CONFIG = AppConfig();
@Injectable()
export class BrevoClient implements MailClient {
  //   private api = new SibApiV3Sdk.TransactionalEmailsApi();

  //   constructor() {
  //     SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  //       process.env.BREVO_API_KEY!;
  //   }
  private transporter = nodemailer.createTransport({
    host: CONFIG.emailService.brevo.smtpHost,
    port: CONFIG.emailService.brevo.smtpPort,
    auth: {
      user: CONFIG.emailService.brevo.smtpUser,
      pass: CONFIG.emailService.brevo.smtpPass,
    },
  });

  async send({ from, to, subject, text, attachments }: any): Promise<void> {
    Logger.log(
      'Sending email via BrevoClient using SMTP transport',
      BrevoClient.name,
    );

    await this.transporter.sendMail({
      from,
      to,
      subject,
      text,
      attachments
    });
  }
}

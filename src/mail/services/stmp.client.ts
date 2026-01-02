import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailClient } from '../interfaces/mail-client.interface';
import { AppConfig } from 'src/config/config';
const CONFIG = AppConfig();
@Injectable()
export class SmtpClient implements MailClient {
  private transporter = nodemailer.createTransport({
    host: CONFIG.emailService.maitrap.smtpHost,
    port: CONFIG.emailService.maitrap.smtpPort,
    secure: false,
    auth: {
      user: CONFIG.emailService.maitrap.smtpUser,
      pass: CONFIG.emailService.maitrap.smtpPass,
    },
  });

  async send({ to, subject, text }: any): Promise<void> {
    Logger.log(
      'Sending email via MailTrapClient using SMTP transport',
      SmtpClient.name,
    );

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL!,
      to,
      subject,
      text,
    });
  }
}

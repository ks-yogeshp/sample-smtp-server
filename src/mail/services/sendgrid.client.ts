import { Injectable, Logger } from '@nestjs/common';
// import * as sgMail from '@sendgrid/mail';
import { MailClient } from '../interfaces/mail-client.interface';
import { AppConfig } from 'src/config/config';
import * as nodemailer from 'nodemailer';
import { debug } from 'console';
const CONFIG = AppConfig();

@Injectable()
export class SendGridClient implements MailClient {
  //   constructor() {
  //     sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  //   }
  private transporter = nodemailer.createTransport({
    host: CONFIG.emailService.sendGrid.smtpHost,
    port: CONFIG.emailService.sendGrid.smtpPort,
    auth: {
      user: CONFIG.emailService.sendGrid.smtpUser,
      pass: CONFIG.emailService.sendGrid.smtpPass,
    },
  });

  async send({ from, to, subject, text, attachments }: any): Promise<void> {
    Logger.log(
      'Sending email via SendGridClient using SMTP transport',
      SendGridClient.name,
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

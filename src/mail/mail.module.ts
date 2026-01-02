import { Module } from '@nestjs/common';
import { MailWorker } from './mail.worker';
import { MailQueue } from './mail-queue';
import { BrevoClient } from './services/brevo.client';
import { SendGridClient } from './services/sendgrid.client';
import { SmtpClient } from './services/stmp.client';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailWorker, MailQueue, BrevoClient, SendGridClient, SmtpClient],
  exports: [MailQueue],
})
export class MailModule {}

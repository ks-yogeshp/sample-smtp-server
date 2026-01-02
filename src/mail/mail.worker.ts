import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { UserConfig } from 'src/db/user.entity';
import { BrevoClient } from './services/brevo.client';
import { SendGridClient } from './services/sendgrid.client';
import { SmtpClient } from './services/stmp.client';

@Processor('mail')
@Injectable()
export class MailWorker extends WorkerHost {
  private readonly logger = new Logger(MailWorker.name);

  constructor(
    private readonly brevoClient: BrevoClient,
    private readonly sendgridClient: SendGridClient,
    private readonly smtpClient: SmtpClient,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name !== 'sendMail') return;

    const {
      messageId,
      config, // 👈 from SMTP session.user
      from, // MAIL FROM
      to, // RCPT TO[] (array)
      subject,
      text,
      html,
    } = job.data;

    this.logger.log(
      `📤 Processing mail job ${job.id} (attempt ${job.attemptsMade + 1})`,
    );

    try {
      let provider;
      if (config === UserConfig.BREVO) {
        provider = this.brevoClient;
      } else if (config === UserConfig.SENDGRID) {
        provider = this.sendgridClient;
      } else {
        provider = this.smtpClient;
      }
      await provider.send({
        from, // original sender
        to,
        subject,
        text,
        html,
      });

      this.logger.log(
        `✅ Mail job ${messageId} processed for ${to} recipient(s)`,
      );
    } catch (err) {
      this.logger.error(
        `❌ Mail job ${messageId} failed`,
        err instanceof Error ? err.stack : undefined,
      );

      // ❗ rethrow so BullMQ retries
      throw err;
    }
  }
}

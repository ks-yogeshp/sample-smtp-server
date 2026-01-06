import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { BrevoClient } from './services/brevo.client';
import { SendGridClient } from './services/sendgrid.client';
import { SmtpClient } from './services/stmp.client';
import { Provider, ProviderConfig } from 'src/db/entitites/user.entity';

@Processor('mail',{ concurrency: 5 })
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
  private selectProvider(config: ProviderConfig) {
    const enabled = Object.entries(config);
    // console.log('Enabled providers:', enabled);

    const total = enabled.reduce((s, [, v]) => s + v.weight, 0);
    let r = Math.random() * total;

    for (const [provider, v] of enabled) {
      r -= v.weight;
      if (r <= 0) return provider;
    }

    throw new Error('No provider available');
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
      attachments
    } = job.data;
    const selectedProvider = this.selectProvider(config);
    this.logger.log(
      `📤 Processing mail job ${job.id} (attempt ${job.attemptsMade + 1})`,
    );
    attachments?.forEach((att) => att.content = Buffer.from(att.content, 'base64'));
    // console.log('attachments:', attachments);

    try {
      let client;
      if (selectedProvider === Provider.BREVO) {
        client = this.brevoClient;
      } else if (selectedProvider === Provider.SENDGRID) {
        client = this.sendgridClient;
      } else {
        client = this.smtpClient;
      }
      await client.send({
        from, // original sender
        to,
        subject,
        text,
        html,
        attachments
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

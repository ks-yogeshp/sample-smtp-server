import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Provider } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ProviderConfig } from 'src/db/entitites/user.entity';

@Injectable()
export class MailQueue {
  constructor(@InjectQueue('mail') private queue: Queue) {}

  async enqueue(payload) {
    

    await this.queue.add('sendMail', payload, {
      jobId: `mail.${payload.messageId}`,
      attempts: 3,
      backoff: { type: 'exponential', delay: 3000 },
      removeOnComplete: true,
    });
  }
}

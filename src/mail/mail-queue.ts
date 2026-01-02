import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

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

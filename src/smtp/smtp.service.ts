import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';
import { MailQueue } from 'src/mail/mail-queue';
import { AppConfig } from 'src/config/config';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

interface MailPayload {
  messageId: string;
  config: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments: any[];
}
const CONFIG = AppConfig();
@Injectable()
export class SmtpService implements OnModuleInit {
  // private readonly logger = new Logger(SmtpService.name);

  // // In-memory dedupe (replace with Redis/DB in prod)
  // private readonly seen = new Set<string>();

  // constructor(
  //   private mailQueue: MailQueue,
  //   private readonly userService: UserService,
  // ) {}

  onModuleInit() {
  //   const server = new SMTPServer({
  //     authOptional: true,
  //     onAuth: async (auth, session, cb) => {
  //       const user = await this.userService.getUser(auth.username);

  //       const ok =
  //         auth.username === user.username &&
  //         (await bcrypt.compare(auth.password, user.password));
  //       session.config = user.config;
  //       if (!ok) {
  //         return cb(new Error('Invalid SMTP credentials'));
  //       }
  //       return cb(null, { user: 'Authenticated' });
  //     },

  //     /**
  //      * Parse DATA and enqueue jobs
  //      */
  //     onData: async (stream, session, cb) => {
  //       try {
  //         const mail = await simpleParser(stream);
  //         const messageId = mail.messageId || `${Date.now()}-${Math.random()}`;

  //         // Deduplicate
  //         if (this.seen.has(messageId)) {
  //           this.logger.warn(`Duplicate ignored: ${messageId}`);
  //           return cb();
  //         }
  //         this.seen.add(messageId);
  //         //   console.log(session)
  //         const config = session.config;
  //         const from = mail.from?.value?.[0]?.address ?? 'unknown@local';
  //         const recipients = session.envelope.rcptTo || [];
  //         const subject = mail.subject || '(no subject)';
  //         const text = mail.text || '';
  //         const html = mail.html || undefined;
  //         const attachments = mail.attachments || [];
  //         for (const mailbox of recipients) {
  //           const payload: MailPayload = {
  //             messageId,
  //             config,
  //             from,
  //             to: mailbox?.address,
  //             subject,
  //             text,
  //             html,
  //             attachments
  //           };
  //           payload.attachments.forEach(att => att.content = att.content.toString('base64'));
  //           // console.log('Enqueuing mail payload:', payload);
  //           await this.mailQueue.enqueue(payload);
  //         }

  //         this.logger.log(
  //           `📥 Accepted ${recipients.length} rcpt(s), msg=${messageId}`,
  //         );
  //         cb();
  //       } catch (err) {
  //         this.logger.error('SMTP DATA error', err as any);
  //         cb(err as Error);
  //       }
  //     },
  //   });

  //   server.listen(2525, '127.0.0.1');
  }
}

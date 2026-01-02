import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { User } from 'src/db/user.entity';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  providers: [SmtpService],
})
export class SmtpModule {}

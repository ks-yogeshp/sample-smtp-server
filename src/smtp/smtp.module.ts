import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { User } from 'src/db/entitites/user.entity';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { SmtpController } from './smtp.controller';

@Module({
  imports: [UserModule, MailModule],
  providers: [SmtpService],
  controllers: [SmtpController],
})
export class SmtpModule {}

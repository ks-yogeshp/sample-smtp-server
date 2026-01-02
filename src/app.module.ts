import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { SmtpModule } from './smtp/smtp.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { BullModule } from '@nestjs/bullmq';
import { AppConfig } from './config/config';
import { UserModule } from './user/user.module';

const CONFIG = AppConfig();
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BullModule.forRoot({
      connection: {
        url: CONFIG.redis.url,
      },
    }),
    MailModule,
    SmtpModule,
    UserModule,
  ],
})
export class AppModule {}

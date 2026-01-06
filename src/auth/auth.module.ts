import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { GoogleStratedy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AppConfig } from 'src/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entitites/user.entity';

const CONFIG = AppConfig();
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: CONFIG.jwt.secret,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // GoogleStratedy
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/config/config';

const CONFIG = AppConfig();

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractRequestFromHeader(request);
    // if (token) {
    //   const user = await this.jwtService.verifyAsync(token, {
    //     secret: CONFIG.jwt.secret,
    //   });
    //   if (request.body.role !== Role.STUDENT) {
    //     if (request.body.role === Role.MANAGER && user.role === Role.ADMIN) {
    //       return true;
    //     }
    //   } else {
    //     return true;
    //   }
    // } else {
    //   if (request.body.role === Role.STUDENT) {
    //     return true;
    //   }
    // }
    if (token) {
      return true;
    }
    return false;
  }
  private extractRequestFromHeader(request: Request): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = request.headers['authorization']?.split(' ') ?? [];
    return token;
  }
}

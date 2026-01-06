import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Controller('internal/smtp')
export class SmtpController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('auth')
  async auth(@Body() body: any) {
    const { username, password } = body;
    const user = await this.userService.getUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        ok: true,
        username: user.username,
        message: 'Authenticated',
      };
    }
    

    return {
      ok: false,
      message: 'Invalid credentials',
    };
  }
}
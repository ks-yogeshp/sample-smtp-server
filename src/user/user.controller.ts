import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('profile')
  async updateUser(
    @ActiveUser() user: IActiveUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(user.username, updateUserDto);
  }
}

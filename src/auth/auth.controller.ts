import type { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { PermissionGuard } from './guards/permission.guard';
import {
  ApiBody,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto, UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth({ isPublic: 'local' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate a user and return a JWT token.',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: Object,
  })
  login(@Request() res) {
    return this.authService.login(res.user);
  }

  @ApiBearerAuth()
  @UseGuards(PermissionGuard)
  @Post('sign-up')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Add a new user to the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: UserDto,
  })
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    return new UserDto(user);
  }

  // @Get('google')
  // @Auth({
  //   isPublic: 'google',
  // })
  // auth() {
  //   return {};
  // }

  // @Get('google/callback')
  // @Auth({
  //   isPublic: 'google',
  // })
  // async googleAuthCallback(@Req() req, @Res() res: Response) {
  //   const token = await this.authService.googleLoginIn(req.user);
  //   return res.redirect(`http://localhost:3500?token=${token}`);

  //   // res.cookie('access_token', token, {
  //   //   maxAge: 30 * 24 * 60 * 60 * 1000,
  //   //   sameSite: 'none',
  //   //   secure: true,
  //   //   httpOnly: true,
  //   // });
  //   // try{
  //   //   return res.redirect(`http://localhost:3500?token=${token}`);
  //   // }
  //   // catch(err){
  //   //   Logger.error('Redirection error:', err);
  //   // }
  // }
}

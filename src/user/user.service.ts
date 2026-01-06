import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entitites/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(username: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { username } });
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { username },
    });
    user.config = updateUserDto.config ?? user.config;
    user.rateLimitPerDay =
      updateUserDto.rateLimitPerDay ?? user.rateLimitPerDay;
    return await this.userRepository.save(user);
  }
}

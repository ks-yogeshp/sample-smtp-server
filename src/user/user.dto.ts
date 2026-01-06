import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProviderConfig, User } from 'src/db/entitites/user.entity';
export class ProviderWeightDto {
  @ApiProperty({ example: 70 })
  @IsInt()
  @Min(1)
  weight: number;
}

export class ProviderConfigDto {
  @ApiPropertyOptional({ type: ProviderWeightDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderWeightDto)
  sendgrid?: ProviderWeightDto;

  @ApiPropertyOptional({ type: ProviderWeightDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderWeightDto)
  brevo?: ProviderWeightDto;

  @ApiPropertyOptional({ type: ProviderWeightDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderWeightDto)
  mailtrap?: ProviderWeightDto;
}

export class UserDto {
  @ApiProperty({ description: 'Unique identifier for the user', example: 1 })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Unique username', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: ProviderConfigDto,
    description: 'Email provider configuration',
  })
  @IsObject()
  config: ProviderConfigDto;

  @ApiProperty({ description: 'Rate limit per day', example: 100 })
  @IsInt()
  @Min(1)
  rateLimitPerDay: number;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsString()
  @IsNotEmpty()
  created: string;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2023-01-02T00:00:00Z',
  })
  @IsString()
  @IsNotEmpty()
  updated: string;

  @ApiProperty({
    description: 'Flag indicating if the user is deleted',
    example: false,
  })
  deleted: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.config = user.config;
    this.rateLimitPerDay = user.rateLimitPerDay;
    this.created = user.createdAt.toISOString();
    this.updated = user.updatedAt.toISOString();
    this.deleted = user.deletedAt ? true : false;
  }
}

export class CreateUserDto extends PickType(UserDto, ['username']) {
  @ApiProperty({
    description: 'Password for the user',
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PickType(UserDto, [
  'config',
  'rateLimitPerDay',
]) {}

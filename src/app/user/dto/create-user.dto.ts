import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsLowercase()
  email: string;

  @IsUrl()
  avatarUrl?: string;

  @IsString()
  bio?: string;

  @IsString()
  hashedRefreshToken?: string | null;
}

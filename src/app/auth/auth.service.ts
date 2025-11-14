import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../../types/jwtPayload.types';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async ValidateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return this.userService.createUser(googleUser);
  }

  login(userId: string) {
    const payload: jwtPayload = { id: userId };
    const accessToken: string = this.jwtService.sign(payload);
    const refreshToken: string = this.jwtService.sign(
      payload,
      this.refreshTokenConfig,
    );
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  refreshToken(userId: string) {
    const payload: jwtPayload = { id: userId };
    const accessToken: string = this.jwtService.sign(payload);
    return {
      id: userId,
      accessToken,
    };
  }
}

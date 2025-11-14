import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../../types/jwtPayload.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async ValidateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return this.userService.createUser(googleUser);
  }

  login(userId: string) {
    const payload: jwtPayload = { id: userId };
    return this.jwtService.sign(payload);
  }
}

import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  async logout() {}

  @Public()
  @Post('google/login')
  handleGoogleLogin(@Body('code') code: string) {
    return this.authService.googleLogin(code);
  }

  @Public()
  @Post('github/login')
  handleGithubLogin(@Body('code') code: string) {
    return this.authService.githubLogin(code);
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@User('id') userId: string) {
    return this.authService.refreshToken(userId);
  }

  @Post('signout')
  @HttpCode(200)
  async signOut(@User('id') userId: string) {
    await this.authService.signOut(userId);
    return { message: 'Logged out successfully' };
  }
}

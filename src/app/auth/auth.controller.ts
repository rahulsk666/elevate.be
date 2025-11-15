import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { RequestWithUser } from 'src/types/user.types';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  async logout() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleGoogleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  handleGoogleCallback(@Req() req: RequestWithUser) {
    return this.authService.login(req.user?.id);
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req: RequestWithUser) {
    return this.authService.refreshToken(req.user?.id);
  }

  @Post('signout')
  signOut(@Req() req: RequestWithUser) {
    return this.authService.signOut(req.user.id);
  }
}

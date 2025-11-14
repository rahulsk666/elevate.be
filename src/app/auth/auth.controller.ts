import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { RequestWithUser } from 'src/types/user.types';
import { Public } from 'src/common/decorators/public.decorator';

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
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestException('user id missing in token');
    }
    const token: string = this.authService.login(userId);
    return { id: userId, token };
  }
}

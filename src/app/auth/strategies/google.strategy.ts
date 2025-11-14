import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from 'src/app/auth/config/google-oauth.config';
import { AuthService } from '../auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.client_id!,
      clientSecret: googleConfiguration.client_secret!,
      callbackURL: googleConfiguration.callback_url!,
      scope: ['profile', 'email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value ?? '';
    const user: User = await this.authService.ValidateGoogleUser({
      email,
      name: profile.displayName,
      avatarUrl: profile?.photos?.[0]?.value ?? '',
    });
    done(null, user);
  }
}

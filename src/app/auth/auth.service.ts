import {
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../../types/jwtPayload.types';
import refreshJwtConfig from '../../config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { OAuth2Client } from 'google-auth-library';
import googleOauthConfig from 'src/config/google-oauth.config';
import { SocialUser } from 'src/types/user.types';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private googleClient: OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly http: HttpService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @Inject(googleOauthConfig.KEY)
    private readonly googleClientConfig: ConfigType<typeof googleOauthConfig>,
  ) {
    this.googleClient = new OAuth2Client(
      this.googleClientConfig.client_id,
      this.googleClientConfig.client_secret,
      this.googleClientConfig.callback_url,
    );
  }

  async googleLogin(code: string) {
    const { tokens } = await this.googleClient.getToken(code);

    if (!tokens.id_token) {
      throw new UnauthorizedException('No token returned from google');
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: this.googleClientConfig.client_id,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid token from google');
    }
    const user = await this.ValidateUser({
      email: payload.email ?? '',
      name: payload.name ?? '',
      image: payload.picture ?? '',
    });
    return this.login(user.id);
  }

  async githubLogin(code: string) {
    const tokenRes = await firstValueFrom(
      this.http.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: 'application/json' },
        },
      ),
    );

    const githubToken = tokenRes.data?.access_token;

    if (!githubToken) {
      throw new UnauthorizedException('GitHub token exchange failed');
    }

    const profileRes = await firstValueFrom(
      this.http.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }),
    );

    const emailsRes = await firstValueFrom(
      this.http.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }),
    );

    const primaryEmail = emailsRes.data.find(
      (e: any) => e.primary && e.verified,
    )?.email;

    if (!primaryEmail) {
      throw new UnauthorizedException('No verified email found from GitHub');
    }

    const user = await this.ValidateUser({
      email: primaryEmail,
      name: profileRes.data.name ?? profileRes.data.login,
      image: profileRes.data.avatar_url,
    });

    return this.login(user.id);
  }

  async ValidateUser(socialUser: SocialUser) {
    const user = await this.userService.findByEmail(socialUser.email);
    if (user) return user;
    this.logger.log(`User logged in with social: ${socialUser.email}`);
    return this.userService.create(socialUser);
  }

  async login(userId: string) {
    const { accessToken, refreshToken } = await this.generateToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    const user = await this.userService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
    this.logger.log(`User logged in: ${userId}`);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: string) {
    const { accessToken, refreshToken } = await this.generateToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    const user = await this.userService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
    this.logger.log(`User refreshed token: ${userId}`);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async generateToken(userId: string) {
    const payload: jwtPayload = { id: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async validateHashedRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const refreshTokenMatch = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatch) {
      throw new UnauthorizedException('Inavalid refresh token');
    }
    return { id: userId };
  }

  async signOut(userId: string) {
    this.logger.log(`User signed out: ${userId}`);
    return await this.userService.updateHashedRefreshToken(userId, null);
  }
}

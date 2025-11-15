import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import type { ConfigType } from '@nestjs/config';
import { jwtPayload } from '../../../types/jwtPayload.types';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
    private readonly authService: AuthService,
  ) {
    const secret = refreshJwtConfiguration.secret;
    if (!secret || typeof secret !== 'string') {
      throw new Error(
        'Missing or invalid JWT secret (expected string). Set JWT_SECRET.',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: jwtPayload) {
    const authHeader = req.get('authorization');

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const refreshToken = authHeader.replace('Bearer', '').trim();
    const userId = payload.id;
    return this.authService.validateHashedRefreshToken(userId, refreshToken);
  }
}

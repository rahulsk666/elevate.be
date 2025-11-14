import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { jwtPayload } from '../../../types/jwtPayload.types';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    const secret = jwtConfiguration.secret;
    if (!secret || typeof secret !== 'string') {
      throw new Error(
        'Missing or invalid JWT secret (expected string). Set JWT_SECRET.',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: jwtPayload) {
    return { id: payload.id };
  }
}

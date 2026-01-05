import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { jwtPayload } from 'src/types/jwtPayload.types';
import { RequestWithUser } from 'src/types/user.types';

export const User = createParamDecorator(
  (data: keyof jwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    // request.user is set by your JWT strategy
    const user = request.user;

    if (!user) return null;

    return data ? user[data] : user;
  },
);

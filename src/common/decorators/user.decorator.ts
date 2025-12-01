import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // request.user is set by your JWT strategy
    const user = request.user;

    if (!user) return null;

    return data ? user[data] : user;
  },
);

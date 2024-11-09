import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  <T>(data: unknown, ctx: ExecutionContext): T => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

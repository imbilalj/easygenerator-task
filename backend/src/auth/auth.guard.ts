import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = jwt.verify(
        token,
        this.configService.get<string>('jwtSecretKey'),
      );

      request.user = decoded;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}

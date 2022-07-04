import {
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

// export class JwtWsGuard extends AuthGuard('jwt-ws') {
//   constructor() {
//     super();
//     this.canActivate(context: any) {
//       return "";
//           }
//   }
// }

export class JwtWsGuard implements CanActivate {
  private readonly prisma: PrismaClient = new PrismaClient();
  private readonly jwtService = new JwtService();
  async canActivate(context: any): Promise<boolean | any> {
    try {
      const token = context.args[0].handshake.headers['authorization'];
      const validated = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.prisma.user.findUnique({
        where: {
          id: validated.sub,
        },
      });
      delete user.hash;
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

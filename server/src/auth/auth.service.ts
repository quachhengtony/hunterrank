import { ForbiddenException, Injectable } from '@nestjs/common';
import { GoogleLoginDto, LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Auth, google } from 'googleapis';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private oauthClient: Auth.OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
    private userService: UserService,
  ) {
    this.oauthClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }

  async googleLogin(dto: GoogleLoginDto) {
    const tokenInfo = await this.oauthClient.getTokenInfo(dto.token);
    const user = await this.userService.getUserByEmail(tokenInfo.email);
    if (user) {
      return this.signToken(user.id, user.email);
    }
    return undefined;
  }

  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      const profile = await this.prisma.profile.create({
        data: {
          username: dto.username,
          userId: user.id,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Incorrect credentials');
    }

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Incorrect credentials');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    userEmail: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email: userEmail,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });
    return { access_token: token };
  }
}

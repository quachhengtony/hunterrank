import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
    delete user.hash;
    return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const userToUpdate = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    const profileToUpdate = await this.prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        username: dto.username,
        picture: dto.picture,
      },
    });
  }
}

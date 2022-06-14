import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotificationsByUserId(userId: string) {
    return await this.prisma.notification.findMany({
      select: {
        id: true,
        title: true,
        url: true,
        createdAt: true,
      },
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

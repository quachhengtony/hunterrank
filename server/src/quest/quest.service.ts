import { ForbiddenException, Injectable } from '@nestjs/common';
import { QuestStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestDto, UpdateQuestDto } from './dto';

@Injectable()
export class QuestService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: pagination
  async getAllQuests() {
    return await this.prisma.quest.findMany({
      select: {
        id: true,
        title: true,
        reward: true,
        difficultyLevel: true,
        createdAt: true,
        updatedAt: true,
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getQuestById(questId: string) {
    const quest = await this.prisma.quest.findUnique({
      where: {
        id: questId,
      },
      include: {
        customer: {
          select: {
            profile: true,
          },
        },
        hunters: {
          include: {
            user: {
              select: {
                profile: true,
              },
            },
          },
        },
      },
    });
    return quest;
  }

  async createQuest(userId: string, dto: CreateQuestDto) {
    return await this.prisma.quest.create({
      data: {
        customerId: userId,
        title: dto.title,
        description: dto.description,
        reward: dto.reward,
        difficultyLevel: dto.difficultyLevel,
        location: dto.location,
        startAt: dto.startAt,
        endAt: dto.endAt,
        status: QuestStatus.ACTIVE,
      },
    });
  }

  async updateQuest(userId: string, questId: string, dto: UpdateQuestDto) {
    const questToUpdate = await this.prisma.quest.findUnique({
      where: {
        id: questId,
      },
    });

    if (!questToUpdate || questToUpdate.customerId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return await this.prisma.quest.update({
      data: {
        ...dto,
      },
      where: {
        id: questToUpdate.id,
      },
    });
  }

  async deleteQuest(userId: string, questId: string) {
    const questToDelete = await this.prisma.quest.findUnique({
      where: {
        id: questId,
      },
    });

    if (!questToDelete || questToDelete.customerId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return await this.prisma.quest.delete({
      where: {
        id: questToDelete.id,
      },
    });
  }

  async acceptQuest(userId: string, questId: string) {
    const quest = await this.prisma.quest.findUnique({
      where: {
        id: questId,
      },
    });

    if (quest.customerId === userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return await this.prisma.huntersQuests.create({
      data: {
        questId: questId,
        userId: userId,
      },
    });
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { QuestStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestDto, UpdateQuestDto } from './dto';

@Injectable()
export class QuestService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: pagination
  async getAllQuests() {
    return await this.prisma.quest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getQuestById(questId: string) {
    return await this.prisma.quest.findMany({
      where: {
        id: questId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        customer: true,
        hunters: true,
      },
    });
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
}

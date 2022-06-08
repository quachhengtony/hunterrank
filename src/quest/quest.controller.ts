import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { CreateQuestDto, UpdateQuestDto } from './dto';
import { QuestService } from './quest.service';

@Controller('quests')
export class QuestController {
  constructor(private questService: QuestService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createQuest(
    @GetUser('id') userId: string,
    @Body() dto: CreateQuestDto,
  ) {
    return this.questService.createQuest(userId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllQuests() {
    return this.questService.getAllQuests();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':questId')
  async getQuestById(@Param('questId') questId: string) {
    return this.questService.getQuestById(questId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':questId')
  async updateQuest(
    @GetUser('id') userId: string,
    @Param('questId') questId: string,
    dto: UpdateQuestDto,
  ) {
    return this.questService.updateQuest(userId, questId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':questId')
  async deleteQuest(
    @GetUser('id') userId: string,
    @Param('questId') questId: string,
  ) {
    return this.questService.deleteQuest(userId, questId);
  }
}

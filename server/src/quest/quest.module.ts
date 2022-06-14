import { Module } from '@nestjs/common';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';

@Module({
  providers: [QuestService],
  controllers: [QuestController],
})
export class QuestModule {}

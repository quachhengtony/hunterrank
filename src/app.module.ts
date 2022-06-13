import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { QuestModule } from './quest/quest.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule, UserModule, QuestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

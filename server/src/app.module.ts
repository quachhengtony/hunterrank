import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { QuestModule } from './quest/quest.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule,
    UserModule,
    QuestModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

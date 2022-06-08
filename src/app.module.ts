import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './strategy';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule, UserModule, JwtStrategy],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

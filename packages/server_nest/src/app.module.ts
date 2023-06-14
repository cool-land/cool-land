import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReplyModule } from './reply/reply.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [BotModule, PrismaModule, ReplyModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ReplyModule } from './reply/reply.module';
import BotManager from '@cool-land/bot';

@Module({
  imports: [BotModule, PrismaModule, ReplyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

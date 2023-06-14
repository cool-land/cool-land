import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import BotManager from '@cool-land/bot';
import { HttpExceptionFilter } from 'src/core/filter/http-exception.filter';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BotController],
  providers: [
    BotService,
    {
      provide: 'BotManager',
      inject: [PrismaService],
      useFactory: async (prismaService: PrismaService) => {
        const bots = await prismaService.bot.findMany();

        return new BotManager({
          bots: bots.map((bot) => bot.name),
        });
      },
    },
  ],
})
export class BotModule {}

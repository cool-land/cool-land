import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import BotManager from '@cool-land/bot';
import { HttpExceptionFilter } from 'src/core/filter/http-exception.filter';

@Module({
  controllers: [BotController],
  providers: [
    BotService,
    {
      provide: 'BotManager',
      useClass: BotManager,
    },
  ],
})
export class BotModule {}

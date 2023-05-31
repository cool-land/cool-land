import { Inject, Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import BotFactory from '@cool-land/bot';

@Injectable()
export class BotService {
  @Inject('BotManager')
  private readonly botManager: BotFactory;

  async createBot() {
    const res = this.botManager.createBot();
    return res;
  }

  findAll() {
    return `This action returns all bot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bot`;
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}

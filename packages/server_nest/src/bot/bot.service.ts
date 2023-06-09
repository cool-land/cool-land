import { Inject, Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import BotFactory from '@cool-land/bot';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotService {
  @Inject('BotManager')
  private readonly botManager: BotFactory;

  @Inject(PrismaService)
  private readonly prismaService: PrismaClient;

  async createBot() {
    const res = this.botManager.createBot();
    if (res) {
      const bot = await this.prismaService.bot.create({
        data: {
          pid: res.pid,
          name: res.name,
        },
      });
      console.log('新增机器人：', bot);

      return bot;
    }
    return res;
  }

  async findAll() {
    const bots = await this.prismaService.bot.findMany();
    return bots;
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Header,
  HttpException,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import BotFactory from '@cool-land/bot';
import * as QRCode from 'qrcode';
import { HttpExceptionFilter } from 'src/core/filter/http-exception.filter';

@Controller('bot')
export class BotController {
  @Inject('BotManager')
  private readonly botManager: BotFactory;

  constructor(private readonly botService: BotService) {}

  @Post('create')
  async createBot() {
    const res = this.botManager.createBot();
    return res;
  }

  @Post('start/:pid')
  async startBot(@Param('pid', ParseIntPipe) pid: number) {
    return this.botManager
      .startBot(pid)
      .then((pid) => {
        console.log(pid);
        return `pid: ${pid} started`;
      })
      .catch((e) => {
        throw new HttpException('机器人不存在', HttpStatus.BAD_REQUEST);
      });
  }

  @Post('stop/:pid')
  async stopBot(@Param('pid', ParseIntPipe) pid: number) {
    try {
      await this.botManager.stopBot(pid);
      return `pid: ${pid} stopped`;
    } catch (error) {
      throw new HttpException('机器人不存在', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  getAllBot() {
    return this.botManager.getAllBot();
  }

  @Get('get/:pid')
  getBot(@Param('pid', ParseIntPipe) pid: number) {
    return this.botManager.getBot(pid);
  }

  @Post('remove/:pid')
  removeBot(@Param('pid', ParseIntPipe) pid: number) {
    return this.botManager.removeBot(pid);
  }

  @Get('getQrcode/:pid')
  @Header('Content-Type', 'image/png')
  getQrcode(@Param('pid', ParseIntPipe) pid: number) {
    const qrCode = this.botManager.getBot(pid)?.qrCode;
    if (!qrCode) {
      return null;
    }
    return QRCode.toDataURL(qrCode);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Inject,
  ValidationPipe,
} from '@nestjs/common';
import { ReplyService } from './reply.service';

import { Reply, Prisma } from '@prisma/client';
import { RedisClientType } from 'redis';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('reply')
export class ReplyController {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  constructor(private readonly replyService: ReplyService) {}

  @Get('get/:id')
  async findOne(@Param('id') id: ParseIntPipe) {
    return this.replyService.getReply(Number(id));
  }

  @Get('getReplyByKeyword')
  async getReplyByKeyword(@Query() query: Prisma.ReplyWhereUniqueInput) {
    const { keyword, id } = query;
    return this.replyService.getReplyByKeyword(keyword);
  }

  @Get('all')
  async getAllReply(): Promise<Reply[]> {
    return this.replyService.getAllReply();
  }

  @Post('create')
  async create(@Body(new ValidationPipe()) params: Reply): Promise<Reply> {
    try {
      return this.replyService.createReply(params);
    } catch (error) {}
  }

  @Patch(':id')
  async Update(@Param('id') id: number): Promise<Reply> {
    return this.replyService.updateReply(id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.replyService.deleteReply({ id: Number(id) });
  }
}

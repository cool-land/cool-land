import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReplyService } from './reply.service';

import { Reply, Prisma } from '@prisma/client';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get('get/:id')
  async findOne(@Param('id') id: ParseIntPipe) {
    return this.replyService.getReply(Number(id));
  }
  @Get('all')
  async getAllReply(): Promise<Reply[]> {
    return this.replyService.getAllReply();
  }

  @Post('create')
  async create(@Body() params: Reply): Promise<Reply> {
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

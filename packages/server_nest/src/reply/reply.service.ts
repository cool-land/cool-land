import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reply, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class ReplyService {
  constructor(private readonly prisma: PrismaService) {}

  async createReply(params: Reply): Promise<Reply> {
    const { keyword } = params;
    const query: Prisma.ReplyWhereUniqueInput = { keyword };

    const isExist = await this.prisma.reply.findUnique({
      where: query,
      select: { id: true },
    });

    if (isExist) {
      throw new HttpException('同一关键字只能存在1个', HttpStatus.BAD_REQUEST);
    }

    const res = await this.prisma.reply.create({
      data: params,
    });
    return res;
  }

  async updateReply(id: number): Promise<Reply> {
    return this.prisma.reply.update({
      where: { id: Number(id) },
      data: {},
    });
  }

  async deleteReply(where: Prisma.ReplyWhereUniqueInput): Promise<Reply> {
    return this.prisma.reply.delete({
      where,
    });
  }

  async getReply(id: number): Promise<Reply | null> {
    return this.prisma.reply.findUnique({
      where: { id },
    });
  }

  async getReplyByKeyword(keyword: string) {
    return this.prisma.reply.findUnique({
      where: {
        keyword,
      },
    });
  }

  async getAllReply() {
    const replies = await this.prisma.reply.findMany();
    return replies;
  }
}

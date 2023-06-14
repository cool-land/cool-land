import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}

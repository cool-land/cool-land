import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import BotFactory from '@cool-land/bot';
import { RedisClientType } from 'redis';

@Controller()
export class AppController {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test/redis')
  async testRedis() {
    const { redisClient } = this;
    const key = 'test';
    const value = 1;
    if (await redisClient.exists(key)) {
      await redisClient.incr(key);
    } else {
      await redisClient.set(key, value);
    }
    const res = await redisClient.get(key);
    return res;
  }
}

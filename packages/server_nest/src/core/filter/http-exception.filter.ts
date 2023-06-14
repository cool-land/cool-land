import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {
    console.log('HttpExceptionFilter');
  }
  async catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exception:', exception);
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response: Response = ctx.getResponse(); // 获取请求上下文中的 response对象

    const status = exception.getStatus(); // 获取异常状态码
    const exceptionResponse: any = exception.getResponse();

    // 设置错误信息
    const message = exceptionResponse.message
      ? exceptionResponse.message
      : exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      message: message,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}

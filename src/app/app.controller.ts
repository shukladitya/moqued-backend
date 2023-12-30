import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JsonDto } from './dtos/app.dto';
import { Request } from 'express';
import { AuthGuard } from './Guards/AuthGuard';
import { HashInterceptor } from './Interceptors/requestHash.interceptor';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/health')
  getHello(@Req() req: Request): string {
    const user: {
      name?: string;
    } = req.user;
    if (req.user) return `Hi! ${user.name}, server is running!`;
    return 'Server up! You are not authenticated.';
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(HashInterceptor) // this hash is combination of userId and route
  @Post('/new-json')
  generateJsonResponse(@Body() body: JsonDto, @Req() req: any) {
    return this.appService.generateJsonResponse(
      body,
      req.body.requestHash,
      req.user.email,
    );
  }
}

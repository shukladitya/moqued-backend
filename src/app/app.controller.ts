import {
  Body,
  Controller,
  Get,
  Param,
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
import { generateHash } from './utils/generateHash';

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

  //consume route
  // @UseGuards(AuthGuard)
  @Get(':route')
  async consumeRoute(@Param() routeName: any, @Req() req: any) {
    const { route } = routeName;
    console.log(route, 'route');
    console.log(req.user.email, 'req.user.email');
    const userRouteHash = generateHash(route + req.user.email); // cant use user hash interceptor here because it will not have route in body
    console.log(userRouteHash, 'userRouteHash');
    return this.appService.consumeRoute(userRouteHash);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JsonDto } from './dtos/app.dto';

@Controller('/')
export class AppController {
  constructor(public appService: AppService) {
    this.appService = appService;
  }

  @Get('/health')
  getHello(): string {
    return 'Server up!';
  }

  @Post('/json')
  generateJson(@Body() body: JsonDto) {
    return this.appService.generateJson(body);
  }
}

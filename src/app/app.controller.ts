import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { JsonDto } from './dtos/app.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/health')
  getHello(): string {
    return 'Server up!';
  }

  @Post('/json')
  generateJson(@Body() body: JsonDto, @Req() req: any) {
    console.log(req, 'req');
    return this.appService.generateJson(body);
  }
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { GlobalModule } from './global.module';

async function bootstrap() {
  const app = await NestFactory.create(GlobalModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
  console.log('Listening on port 3000:');
}
bootstrap();

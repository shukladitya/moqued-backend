import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { GlobalModule } from './global.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { redisSessionStore } from './redisConfig/redisConfig';

async function bootstrap() {
  const app = await NestFactory.create(GlobalModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 90,
      },
      store: redisSessionStore,
    }),
  ); // use redis to store session data
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
  console.log('Listening on port 3000:');
}
bootstrap();

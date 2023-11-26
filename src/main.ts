import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { GlobalModule } from './global.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(GlobalModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const redisClient = createClient();
  // { // put these configurations in createClient
  //   port: 6379,
  //   host: 'localhost',
  //   family: 4, // 4 (IPv4) or 6 (IPv6)
  //   password: 'your-redis-server-password',
  //   db: 0, //Redis database number
  // }
  redisClient.connect().catch(console.error);
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
    ttl: 1000 * 60 * 60 * 24 * 90,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 90,
      },
      store: redisStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
  console.log('Listening on port 3000:');
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from 'src/typeorm/entities/prompt.entity';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisPromptStore } from 'src/redisConfig/redisConfig';
import RedisStore from 'connect-redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prompt]),
    CacheModule.register({
      store: redisPromptStore as CacheStore & RedisStore,
      isGlobal: true,
    }),
    // setting up redis for storing prompt data. redisPromptStore is defined in configuration, This is a HACK.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

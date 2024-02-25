import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from 'src/typeorm/entities/prompt.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisPromptStore } from 'src/redisConfig/redisConfig';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prompt]),
    CacheModule.register<RedisClientOptions>(redisPromptStore),
    // setting up redis for storing prompt data. redisPromptStore is defined in configuration, This is a HACK.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

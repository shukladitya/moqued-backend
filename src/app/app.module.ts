import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from 'src/typeorm/entities/prompt.entity';
import { RedisModule } from '@nestjs-modules/ioredis';
import { redisPromptStore } from 'src/redisConfig/redisConfig';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prompt]),
    RedisModule.forRoot(redisPromptStore),
    // setting up redis for storing prompt data. redisPromptStore is defined in configuration, This is a HACK.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';

import { AppController } from './app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
import { AppService } from './app/app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'aditya',
      entities: [User],
      database: 'moqueddb',
      synchronize: true,
      logging: 'all',
    }),
  ],
  providers: [AppService],
  controllers: [AuthenticationController, AppController],
})
export class GlobalModule {}

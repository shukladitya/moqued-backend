import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
import { AppModule } from './app/app.module';
import { AuthenticationModule } from './authentication/authentication.module';

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
    AppModule,
    AuthenticationModule,
  ],
})
export class GlobalModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
import { AppModule } from './app/app.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { Prompt } from './typeorm/entities/prompt.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      password: 'postgres',
      username: 'aditya',
      entities: [User, Prompt],
      database: 'moqueddb',
      synchronize: true,
      logging: 'all',
    }),
    AppModule,
    AuthenticationModule,
  ],
})
export class GlobalModule {}

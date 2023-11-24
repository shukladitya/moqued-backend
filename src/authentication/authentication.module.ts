import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/googleOAuth20';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './utils/serializer';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthenticationController],
  providers: [GoogleStrategy, AuthenticationService, SessionSerializer],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}

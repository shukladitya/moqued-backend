import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GoogleStrategy } from './strategies/googleOAuth20';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AuthenticationService, GoogleStrategy],
})
export class AuthenticationModule {}

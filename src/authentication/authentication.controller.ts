import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './Guards/AuthGuard';

@Controller('/login')
export class AuthenticationController {
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {
    return 'google login';
  }
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  loginGoogleRedirect() {
    return 'google login redirect';
  }
}

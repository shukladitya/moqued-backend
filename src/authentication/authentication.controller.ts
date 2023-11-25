import { Controller, Get, UseGuards } from '@nestjs/common';

import { GithubAuthGuard } from './Guards/GithubAuthGuard';
import { GoogleAuthGuard } from './Guards/GoogleAuthGuard';

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

  @Get('/github')
  @UseGuards(GithubAuthGuard)
  async githubLogin() {
    return 'github login';
  }

  @Get('/github/redirect')
  @UseGuards(GithubAuthGuard)
  githubLoginRedirect() {
    return 'github login redirect';
  }
}

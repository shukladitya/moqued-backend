import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthenticationService) {
    super({
      clientID: process.env.GITHUB_AUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/login/github/redirect`,
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    console.log(accessToken, _refreshToken, profile);

    const user = await this.authService.validateUser({
      name: profile.displayName,
      email: profile.username,
      photo: profile.photos[0].value,
    });

    return user || false;
  }
}

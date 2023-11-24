import { PassportSerializer } from '@nestjs/passport';
import { AuthenticationService } from '../authentication.service';
import { User } from 'src/typeorm/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthenticationService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: any) => void) {
    // after successful serialization the user object will be made into a hash and sent to the client in cookie header.
    done(null, user);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    // after successful deserialization the user object will be pasted in to request object and can be accessed by any route
    // by req.user and can take decision accordingly as if(!req.user) return 401

    const user = await this.authService.findUserById(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}

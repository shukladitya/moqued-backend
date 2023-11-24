import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // actual authetication happens in the validation function of auth guard,
  // but that function is connected to the below validate user function to write business logic,
  // i.e when validate returns truthy value it means user is authenticated, so we will do that here and make it return true or false.
  // and also write some logic here so that we can store that user in db as well
  validateUser(user: UserDto) {}
}

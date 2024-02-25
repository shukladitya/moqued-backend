import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { generateHash } from '../utils/generateHash';

export class HashInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log(request.body.apiRoute, 'request.body');
    console.log(request.user.email, 'request.user.email');
    const hash = generateHash(request.body.apiRoute + request.user.email);
    console.log(hash, 'hashgenerated');
    request.body.requestHash = hash;
    return next.handle();
  }
}

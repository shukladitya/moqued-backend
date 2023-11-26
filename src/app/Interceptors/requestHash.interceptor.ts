import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { generateHash } from '../utils/generateHash';

export class HashInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const hash = generateHash(request.body.route + request.user.email);
    request.body.requestHash = hash;
    return next.handle();
  }
}

import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  public intercept(
    context: ExecutionContext,
    call$: CallHandler,
  ): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    const { data: reqBody } = req.body;
    req.body = reqBody;

    return call$.handle().pipe(map(data => ({ data })));
  }
}

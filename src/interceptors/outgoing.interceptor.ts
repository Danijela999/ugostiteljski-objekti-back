import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

@Injectable()
export class OutgoingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    //return next.handle().pipe(map((data) => data)); !!! this stays
    return next.handle().pipe(
      tap({
        next: (val) => {
          return val;
        },
        error: (error) => {
          return error;
        }
      })
    );
  }
}

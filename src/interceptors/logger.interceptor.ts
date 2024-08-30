import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Response } from "express";
import { AppConfigService } from "../config/configuration.service";

/**
 * Serves so we can log every response that is NOT exception
 * Request and Response are logged separately as a security check
 * so we can see if every request that started also ended
 * Exception responses are logged in src\filters\allExceptions.filter.ts
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  static fileName: string = __filename;
  constructor(private readonly appConfigService: AppConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqDate = new Date();
    const requestInfo = {
      controller: context.getClass().name,
      method: context.getHandler().name,
    };

    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return next.handle().pipe(
      tap(
        (data) => {
          const resDate = new Date();
          // If data is instance of CommonResponse class it will have headers and raw property
          if (data.headers) {
            Object.entries(data.headers).forEach(([key, value]) => {
              response.setHeader(key, value.toString());
            });
            delete data.headers;
          }
          if (data.raw) {
            data = data.data;
          }
          response.send(data);
        },
        (error) => {
          throw { error, reqDate, requestInfo };
        }
      )
    );
  }
}

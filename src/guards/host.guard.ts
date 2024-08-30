import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AppConfigService } from "../config/configuration.service";
import { CustomForbiddenException } from "../http/http.exception";

/**
 * Allow application access only by predefined hosts, that is urls
 */
@Injectable()
export class HostGuard implements CanActivate {
  constructor(private readonly appConfigService: AppConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // console.log("request.headers.host");
    // console.log(request.headers.host);
    const reqDate = new Date();
    const requestInfo = {
      controller: context.getClass().name,
      method: context.getHandler().name
    };
    let appHostLength = this.appConfigService.appHost.length;
    let res = false;
    if (appHostLength) {
      for (let i = 0; i < appHostLength; i++) {
        if (request.headers.host === this.appConfigService.appHost[i]) {
          res = true;
          break;
        }
      }
      if (!res) {
        throw {
          error: new CustomForbiddenException("Your Host Is Not Valid!")
            .exception,
          reqDate,
          requestInfo
        };
      }
    } else {
      // if there is no process.env.HOST, or its value is empty string than allow all hosts
      res = true;
    }
    return res;
  }
}

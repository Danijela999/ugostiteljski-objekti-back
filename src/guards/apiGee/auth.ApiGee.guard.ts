import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import * as multer from "multer";
import AppUserServiceApiG from "../../app/appUser/apiGee/appUser.apiGee.service";
import { CustomInternalServerErrorExceptionApiG } from "../../http/apiGee/http.apiGee.exception";
import { httpApiGeeCodes } from "../../http/apiGee/http.apiGeeCodes.enum";

const apiCode = httpApiGeeCodes["UserController"];

@Injectable()
export class AuthGuardApiG implements CanActivate {
  constructor(private readonly appUserService: AppUserServiceApiG) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let authorization = request.headers.authorization;
    if (
      !authorization &&
      (request.headers["content-type"]?.includes("multipart/form-data;") ||
        request.headers["content-type"]?.includes(
          "application/x-www-form-urlencoded"
        ))
    ) {
      const postMulterRequest: any = await new Promise((resolve, reject) => {
        multer().any()(request, context.switchToHttp().getResponse(), function(
          error
        ) {
          if (error)
            reject(
              new CustomInternalServerErrorExceptionApiG(
                apiCode,
                "Error getting form data from request",
                undefined,
                undefined,
                error
              ).exception
            );
          resolve(request);
        });
      });
      authorization = postMulterRequest.body.authorization;
    }
    const reqDate = new Date();
    const requestInfo = {
      controller: context.getClass().name,
      method: context.getHandler().name,
    };
    return await this.validateRequest(
      apiCode,
      authorization,
      reqDate,
      requestInfo
    );
  }

  async validateRequest(
    apiCode: string,
    authorization: string,
    reqDate: Date,
    requestInfo: any
  ): Promise<boolean> {
    console.log(authorization);
    return await this.appUserService.checkUser(
      apiCode,
      authorization,
      reqDate,
      requestInfo
    );
  }
}

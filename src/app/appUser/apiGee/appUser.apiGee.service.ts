import { Injectable, Scope } from "@nestjs/common";
import {
  CustomForbiddenExceptionApiG,
  CustomInternalServerErrorExceptionApiG,
  CustomUnauthorizedExceptionApiG,
} from "../../../http/apiGee/http.apiGee.exception";
import BizExternalUserService from "../../../bizServices/appUser/bizExternalUser.service";
import UserDto from "src/app/user/dto/user.dto";
import { UserInRedis } from "src/biz/redis/dto/userRedis.dto";

@Injectable({ scope: Scope.REQUEST })
export default class AppUserServiceApiG {
  constructor(
    private readonly bizExternalUserService: BizExternalUserService
  ) {}

  async checkUser(
    apiCode: string,
    authtoken: string,
    reqDate: Date,
    requestInfo: any
  ): Promise<boolean> {
    let ret: boolean = false;
    let foundData: UserDto;
    let userInRedis: UserInRedis;
    try {
      userInRedis = await this.bizExternalUserService.getExternalUser(
        authtoken
      );
    } catch (error) {
      throw {
        error: new CustomInternalServerErrorExceptionApiG(
          apiCode,
          "Error in function!"
        ).exception,
        reqDate,
        requestInfo,
      };
    }

    try {
      if (
        userInRedis.email === undefined &&
        userInRedis.firstName === undefined &&
        userInRedis.lastName === undefined
      ) {
        foundData = await this.bizExternalUserService.getUser(authtoken);
        ret = true;
      }
    } catch (error) {
      throw {
        error: new CustomUnauthorizedExceptionApiG(
          apiCode,
          "Unauthorized User!"
        ).exception,
        reqDate,
        requestInfo,
      };
    }
    return ret;
  }
}

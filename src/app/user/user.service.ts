import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import CreateUserDto from "./dto/createUser.dto";
import UserBizService from "src/bizServices/user/user.service";
import LoginUserDto from "./dto/loginUser.dto";
import RefreshTokenDto from "./dto/refreshToken.dto";
import ChangePasswordDto from "./dto/changePassword.dto";
import {
  CustomBadRequestExceptionApiG,
  CustomForbiddenExceptionApiG,
  CustomNotFoundExceptionApiG,
  CustomUnauthorizedExceptionApiG,
} from "src/http/apiGee/http.apiGee.exception";
import { JwtService } from "@nestjs/jwt";
import { AppRedisService } from "src/biz/redis/redis.service";
import * as bcrypt from "bcrypt";
import LogoutDto from "./dto/logout.dto";
import BizExternalUserService from "src/bizServices/appUser/bizExternalUser.service";
import ForgotPasswordDto from "./dto/forgotPassword.dto";
import ChangeProfilePhotoDto from "./dto/changeProfilePhoto.dto";

@Injectable()
export default class UserService {
  constructor(
    private readonly userBizService: UserBizService,
    private readonly bizExternalUserService: BizExternalUserService,
    private readonly jwtService: JwtService,
    private readonly appRedisService: AppRedisService
  ) {}

  async createUser(
    createUserParams: CreateUserDto,
    apiCode: string
  ): Promise<any> {
    const { email } = createUserParams;
    const user = await this.userBizService.getUserByEmail(email, apiCode);
    if (user.length > 0) {
      throw new CustomBadRequestExceptionApiG(apiCode, "User already exists")
        .exception;
    }
    await this.userBizService.createUser(createUserParams, apiCode);
    return new CommonResponse(null, 201, "Created", null, true);
  }

  async loginUser(
    loginUserParams: LoginUserDto,
    apiCode: string
  ): Promise<any> {
    const { email, password } = loginUserParams;
    const user = await this.userBizService.getUserByEmail(email, apiCode);
    if (user.length > 0) {
      const userPassword = user[0].password;
      const isMatch = await bcrypt.compare(password, userPassword);
      if (isMatch) {
        const timeExpire = Date.now() + 1000 * 60 * 15;
        const timeExpireRefresh = Date.now() + 1000 * 60 * 60 * 24 * 7;
        const payload = {
          email: user[0].email,
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          privilegeId: user[0].privilege_id,
          timeExpire,
        };

        const payloadRefresh = {
          email: user[0].email,
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          privilegeId: user[0].privilege_id,
          timeExpire: timeExpireRefresh,
        };
        const accessToken = this.jwtService.sign(payload, {
          expiresIn: "15m",
        });
        const refreshToken = this.jwtService.sign(payloadRefresh, {
          expiresIn: "7d",
        });

        const res = {
          ...payload,
          accessToken,
          refreshToken,
        };
        return new CommonResponse(null, 201, "Created", res);
      } else {
        throw new CustomForbiddenExceptionApiG(
          apiCode,
          "Email or password is wrong"
        ).exception;
      }
    }
    throw new CustomNotFoundExceptionApiG(apiCode, "User not exists").exception;
  }

  async refreshToken(
    refreshTokenParams: RefreshTokenDto,
    apiCode: string
  ): Promise<any> {
    const { token } = refreshTokenParams;
    try {
      const foundData = await this.bizExternalUserService.getUser(token);
      console.log(foundData);
      const { email, firstName, lastName } = foundData;
      const timeExpire = Date.now() + 1000 * 60 * 15;
      const payload = {
        email,
        firstName,
        lastName,
        timeExpire,
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: "15m",
      });
      return new CommonResponse(null, 201, "Created", { accessToken });
    } catch (error) {
      throw new CustomUnauthorizedExceptionApiG(apiCode, "Unauthorized User!")
        .exception;
    }
  }

  async changePassword(
    changePasswordParams: ChangePasswordDto,
    apiCode: string
  ): Promise<any> {
    const { email } = changePasswordParams;
    console.log("CHANGE PASSWORD");
    console.log(email);
    const user = await this.userBizService.getUserByEmail(email, apiCode);
    if (user.length == 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "User not found")
        .exception;
    }
    await this.userBizService.changePassword(changePasswordParams, apiCode);
    return new CommonResponse(null, 201, "Updated", null, true);
  }

  async forgotPassword(
    forgotPasswordParams: ForgotPasswordDto,
    apiCode: string
  ): Promise<any> {
    const { email } = forgotPasswordParams;
    const user = await this.userBizService.getUserByEmail(email, apiCode);
    if (user.length == 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "User not found")
        .exception;
    }
    await this.userBizService.forgotPassword(forgotPasswordParams, apiCode);
    return new CommonResponse(null, 200, "OK", null, true);
  }

  async logout(logoutParams: LogoutDto, apiCode: string): Promise<any> {
    const { accessToken, refreshToken } = logoutParams;
    let userData;
    try {
      userData = await this.bizExternalUserService.getUser(accessToken);
    } catch (error) {
      throw {
        error: new CustomUnauthorizedExceptionApiG(
          apiCode,
          "Unauthorized User!"
        ).exception,
      };
    }
    await this.bizExternalUserService.deleteExternalUser(
      accessToken,
      userData,
      apiCode
    );
    await this.bizExternalUserService.deleteExternalUser(
      refreshToken,
      userData,
      apiCode
    );
    return new CommonResponse(null, 204, "Deleted", null, true);
  }
  async changeProfilePhoto(
    changePhotoParams: ChangeProfilePhotoDto,
    apiCode: string
  ): Promise<any> {
    const { email } = changePhotoParams;
    const user = await this.userBizService.getUserByEmail(email, apiCode);
    if (user.length == 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "User not found")
        .exception;
    }
    await this.userBizService.changeProfilePhoto(changePhotoParams, apiCode);
    return new CommonResponse(null, 201, "Updated", null, true);
  }
  async getUserByEmail(email: string, apiCode: string): Promise<any> {
    const user = await this.userBizService.getUserByEmail(email, apiCode);
    if (user.length == 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "User not found")
        .exception;
    }
    return new CommonResponse(null, 200, "OK", user);
  }
}

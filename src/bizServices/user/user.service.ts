import { Injectable } from "@nestjs/common";
import CreateUserDto from "src/app/user/dto/createUser.dto";
import UserDB from "src/biz/mysql/user/userDB";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";
import ChangePasswordDto from "src/app/user/dto/changePassword.dto";
import { AppRedisService } from "src/biz/redis/redis.service";
import ForgotPasswordDto from "src/app/user/dto/forgotPassword.dto";
import MailClient from "src/biz/api/mail/mail.client";
import MailBodyDto from "src/biz/api/mail/dto/mailBody.dto";
import ChangeProfilePhotoDto from "src/app/user/dto/changeProfilePhoto.dto";
import GetUserByEmailDto from "src/app/user/dto/getUserByEmail.dto";

@Injectable()
export default class UserBizService {
  constructor(
    private readonly userDb: UserDB,
    private readonly appRedisService: AppRedisService,
    private readonly mailClient: MailClient
  ) {}

  async createUser(
    createUserParams: CreateUserDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.userDb.createUser(createUserParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async changePassword(
    changePasswordParams: ChangePasswordDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.userDb.changePassword(changePasswordParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async forgotPassword(
    forgotPasswordParams: ForgotPasswordDto,
    apiCode: string
  ): Promise<any> {
    try {
      const { email } = forgotPasswordParams;
      const mailParams: MailBodyDto = {
        to: email,
        subject: "Forgot password",
        text: "Resetujete password",
      };
      return await this.mailClient.sendMail(mailParams, apiCode);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getUserByEmail(email: string, apiCode: string): Promise<any> {
    try {
      return await this.userDb.getUserByEmail(email);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
  async changeProfilePhoto(
    changePhotoParams: ChangeProfilePhotoDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.userDb.changeProfilePhoto(changePhotoParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}

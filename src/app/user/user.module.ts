import { Module, HttpModule } from "@nestjs/common";
import { AppConfigService } from "../../config/configuration.service";
import MySQLConfig from "src/biz/mysql/builder/config";
import UserController from "./user.controller";
import UserDB from "src/biz/mysql/user/userDB";
import UserBizService from "src/bizServices/user/user.service";
import UserService from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { AppRedisService } from "src/biz/redis/redis.service";
import BizExternalUserService from "src/bizServices/appUser/bizExternalUser.service";
import AppUserServiceApiG from "../appUser/apiGee/appUser.apiGee.service";
import MailClient from "src/biz/api/mail/mail.client";

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secretOrPrivateKey: "tajniKljuc",
      signOptions: { expiresIn: "60s" },
    }),
    // JwtModule.register({
    //   secret: "jwt-secret", // Koristite varijablu okoline za čuvanje tajne
    //   signOptions: { expiresIn: "60s" }, // Token ističe za 60 sekundi
    // }),
  ],
  providers: [
    AppConfigService,
    AppRedisService,
    AppUserServiceApiG,
    UserBizService,
    BizExternalUserService,
    UserService,
    UserDB,
    MailClient,
    MySQLConfig,
  ],
  controllers: [UserController],
})
export class UserModule {}

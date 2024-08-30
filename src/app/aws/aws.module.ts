import { HttpModule, Module } from "@nestjs/common";

import { AppRedisService } from "../../biz/redis/redis.service";
import { AppConfigService } from "../../config/configuration.service";
import BizExternalUserService from "../../bizServices/appUser/bizExternalUser.service";
import MySQLConfig from "src/biz/mysql/builder/config";
import AppUserServiceApiG from "../appUser/apiGee/appUser.apiGee.service";
import { JwtModule } from "@nestjs/jwt";
import AwsBizService from "src/bizServices/aws/aws.service";
import AwsService from "./aws.service";
import AwsController from "./aws.controller";
import { AwsDefModule } from "./awsDef.module";

@Module({
  imports: [
    HttpModule,
    AwsDefModule,
    JwtModule.register({
      secretOrPrivateKey: "tajniKljuc", 
      signOptions: { expiresIn: "60s" }, 
    }),
  ],
  providers: [
    BizExternalUserService,
    AppRedisService,
    AppConfigService,
    AppUserServiceApiG,
    AwsBizService,
    AwsService,
  ],
  controllers: [AwsController],
})
export class AwsModule {}

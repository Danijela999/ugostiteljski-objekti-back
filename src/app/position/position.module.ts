import { HttpModule, Module } from "@nestjs/common";

import { AppRedisService } from "../../biz/redis/redis.service";
import { AppConfigService } from "../../config/configuration.service";
import BizExternalUserService from "../../bizServices/appUser/bizExternalUser.service";
import MySQLConfig from "src/biz/mysql/builder/config";
import AppUserServiceApiG from "../appUser/apiGee/appUser.apiGee.service";
import { JwtModule } from "@nestjs/jwt";
import PositionBizService from "src/bizServices/position/position.service";
import PositionService from "./position.service";
import PositionDB from "src/biz/mysql/position/positionDB";
import PositionController from "./position.controller";

@Module({
  imports: [
    HttpModule,
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
    PositionBizService,
    PositionService,
    PositionDB,
    MySQLConfig,
  ],
  controllers: [PositionController],
})
export class PositionModule {}

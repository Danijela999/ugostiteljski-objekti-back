import { HttpModule, Module } from "@nestjs/common";

import { AppRedisService } from "../../biz/redis/redis.service";
import { AppConfigService } from "../../config/configuration.service";
import BizExternalUserService from "../../bizServices/appUser/bizExternalUser.service";
import MySQLConfig from "src/biz/mysql/builder/config";
import AppUserServiceApiG from "../appUser/apiGee/appUser.apiGee.service";
import TableBizService from "src/bizServices/table/table.service";
import TableService from "./table.service";
import TableDB from "src/biz/mysql/table/tableDB";
import TableController from "./table.controller";
import { JwtModule } from "@nestjs/jwt";

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
    TableBizService,
    TableService,
    TableDB,
    MySQLConfig,
  ],
  controllers: [TableController],
})
export class TableModule {}

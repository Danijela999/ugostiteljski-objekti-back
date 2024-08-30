import { HttpModule, Module } from "@nestjs/common";

import { AppRedisService } from "../../biz/redis/redis.service";
import { AppConfigService } from "../../config/configuration.service";
import BizExternalUserService from "../../bizServices/appUser/bizExternalUser.service";
import MySQLConfig from "src/biz/mysql/builder/config";
import AppUserServiceApiG from "../appUser/apiGee/appUser.apiGee.service";
import { JwtModule } from "@nestjs/jwt";
import CategoryBizService from "src/bizServices/category/category.service";
import CategoryService from "./category.service";
import CategoryDB from "src/biz/mysql/category/categoryDB";
import CategoryController from "./category.controller";

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
    CategoryBizService,
    CategoryService,
    CategoryDB,
    MySQLConfig,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}

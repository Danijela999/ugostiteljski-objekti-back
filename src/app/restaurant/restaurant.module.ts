import { HttpModule, Module } from "@nestjs/common";

import { AppRedisService } from "../../biz/redis/redis.service";
import { AppConfigService } from "../../config/configuration.service";
import BizExternalUserService from "../../bizServices/appUser/bizExternalUser.service";
import MySQLConfig from "src/biz/mysql/builder/config";
import AppUserServiceApiG from "../appUser/apiGee/appUser.apiGee.service";
import RestaurantController from "./restaurant.controller";
import RestaurantBizService from "src/bizServices/restaurant/restaurant.service";
import RestaurantService from "./restaurant.service";
import RestaurantDB from "src/biz/mysql/restaurant/restaurantDB";
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
    RestaurantBizService,
    RestaurantService,
    RestaurantDB,
    MySQLConfig,
  ],
  controllers: [RestaurantController],
})
export class RestaurantModule {}

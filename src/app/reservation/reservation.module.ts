import { HttpModule, Module } from "@nestjs/common";

import { AppRedisService } from "../../biz/redis/redis.service";
import { AppConfigService } from "../../config/configuration.service";
import BizExternalUserService from "../../bizServices/appUser/bizExternalUser.service";
import MySQLConfig from "src/biz/mysql/builder/config";
import AppUserServiceApiG from "../appUser/apiGee/appUser.apiGee.service";
import ReservationController from "./reservation.controller";
import ReservationDB from "src/biz/mysql/reservation/reservationDB";
import ReservationService from "./reservation.service";
import ReservationBizService from "src/bizServices/reservation/reservation.service";
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
    ReservationBizService,
    ReservationService,
    ReservationDB,
    MySQLConfig,
  ],
  controllers: [ReservationController],
})
export class ReservationModule {}

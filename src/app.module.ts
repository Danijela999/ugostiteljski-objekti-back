import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { RedisModule } from "nestjs-redis";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TableModule } from "./app/table/table.module";
import { RestaurantModule } from "./app/restaurant/restaurant.module";
import { UserModule } from "./app/user/user.module";
import MySQLConfig from "./biz/mysql/builder/config";
import MySQLBuilder from "./biz/mysql/builder/mysqlBuilder";
import { AppRedisService } from "./biz/redis/redis.service";
import { AppConfigModule } from "./config/configuration.module";
import { AppConfigService } from "./config/configuration.service";
import { LoggerInterceptor } from "./interceptors/logger.interceptor";
import { ReservationModule } from "./app/reservation/reservation.module";
import { AwsModule } from "./app/aws/aws.module";
import { CategoryModule } from "./app/category/category.module";
import { PositionModule } from "./app/position/position.module";

@Module({
  imports: [
    AppConfigModule,
    CategoryModule,
    RestaurantModule,
    ReservationModule,
    PositionModule,
    TableModule,
    UserModule,
    AwsModule,
    RedisModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) =>
        appConfigService.redis,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppRedisService,
    AppService,
    MySQLBuilder,
    MySQLConfig,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

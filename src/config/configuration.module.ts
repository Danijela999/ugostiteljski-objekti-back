import { Module } from "@nestjs/common";
import configuration from "./configuration";
import { AppConfigService } from "./configuration.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [configuration],
      isGlobal: true
      // validationSchema: Joi.object({}),
    })
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService]
})
export class AppConfigModule {}

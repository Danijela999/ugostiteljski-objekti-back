import { AppConfigService } from "../../../config/configuration.service";
import { Injectable } from "@nestjs/common";

/**
 * This is just going to be a function initializing mysql configurations for DBs
 * telenorid should be value in src\biz\mysql\constants\dbNames.enum.ts
 */
@Injectable()
export default class MySQLConfig {
  private _config: any = {
    ugostiteljskiObjekti: {
      user: this.appConfigService.mysqlUser,
      password: this.appConfigService.mysqlPassword,
      host: this.appConfigService.mysqlHost,
      database: this.appConfigService.mysqlDatabase,
      port: this.appConfigService.mysqlPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    },
  };

  constructor(private readonly appConfigService: AppConfigService) {}

  get config(): any {
    return this._config;
  }
}

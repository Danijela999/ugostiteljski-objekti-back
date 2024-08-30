import { Injectable } from "@nestjs/common";
// @nestjs/config package internally uses dotenv; its for .env managing
import { ConfigService } from "@nestjs/config";
import { RedisModuleOptions } from "nestjs-redis";

/**
 * Service dealing with app config based operations.
 * Just a simple class with getter based class functions.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get appPort(): number {
    return this.configService.get<number>("app.port");
  }
  get appHost(): Array<string> {
    return this.configService.get<Array<string>>("app.host");
  }
 
  get appEnvironment(): string {
    return this.configService.get<string>("app.environment");
  }
  get redisHost(): string {
    return this.configService.get<string>("redis.host");
  }
  get redisPort(): number {
    return this.configService.get<number>("redis.port");
  }
  get redisDb(): number {
    return this.configService.get<number>("redis.db");
  }
  get redisPassword(): number {
    return this.configService.get<number>("redis.password");
  }
  get redis(): RedisModuleOptions {
    const ret: RedisModuleOptions = {
      host: this.configService.get<string>("redis.host"),
      port: this.configService.get<number>("redis.port"),
    };
    if (this.configService.get<number>("redis.db") !== undefined) {
      ret.db = this.configService.get<number>("redis.db");
    }
    if (this.configService.get<string>("redis.password") !== undefined) {
      ret.password = this.configService.get<string>("redis.password");
    }
    return ret;
  }
  // MySQL
  get mysqlHost(): string {
    return this.configService.get<string>("mysql.host");
  }
  get mysqlPort(): number {
    return this.configService.get<number>("mysql.port");
  }
  get mysqlUser(): string {
    return this.configService.get<string>("mysql.user");
  }
  get mysqlDatabase(): string {
    return this.configService.get<string>("mysql.database");
  }
  get mysqlPassword(): string {
    return this.configService.get<string>("mysql.password");
  }
}

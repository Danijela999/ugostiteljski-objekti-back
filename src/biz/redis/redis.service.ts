import { Injectable } from "@nestjs/common";
import { RedisService } from "nestjs-redis";
import { UserInRedis } from "./dto/userRedis.dto";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export class AppRedisService {
  constructor(private readonly redisService: RedisService) {}

  async saveHashMapNew(
    key: string,
    data: any,
    // timeExpire: number,
    apiCode: string
  ): Promise<any> {
    let cli = this.redisService.getClient();

    try {
      await cli.hset(key, "email", data.email);
      await cli.hset(key, "firstName", data.firstName);
      await cli.hset(key, "lastName", data.lastName);
    } catch (error) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, error)
        .exception;
    }

    return true;
  }

  /**
   * Gets user data for the given key
   * @param {String} hashName - key for the data in redis HashMap
   * @returns {Promise<UserInRedis>}
   */
  async getHashMapNew(hashName: string): Promise<UserInRedis> {
    let cli = this.redisService.getClient();
    let retrieved: any;
    try {
      retrieved = await cli.hgetall(hashName);
    } catch (error) {
      throw error;
    }
    console.log(retrieved);
    const { email, firstName, lastName } = retrieved;
    const res: UserInRedis = {
      email,
      firstName,
      lastName,
    };
    return res;
  }

  /**
   * Deletes user data for the given key
   * @param {String} hashName - key for the data in redis HashMap
   * @returns {Promise<number>} - The number of keys that were removed.
   */
  async deleteHashMap(hashName: string, apiCode: string): Promise<number> {
    let cli = this.redisService.getClient();
    let retrieved;
    try {
      retrieved = await cli.del(hashName);
    } catch (error) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, error)
        .exception;
    }
    return retrieved;
  }

  get _redisClient() {
    return this.redisService.getClient();
  }
}

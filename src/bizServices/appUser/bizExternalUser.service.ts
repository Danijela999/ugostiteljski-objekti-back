import { Injectable } from "@nestjs/common";
import { UserInRedis } from "../../biz/redis/dto/userRedis.dto";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";
import { JwtService } from "@nestjs/jwt";
import { AppRedisService } from "src/biz/redis/redis.service";
import UserDto from "src/app/user/dto/user.dto";
@Injectable()
export default class BizExternalUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appRedisService: AppRedisService
  ) {}

  async getUser(hashName: string): Promise<UserDto> {
    return await this.jwtService.verify(hashName);
  }

  /**
   * Deletes user data for the given key
   * @param {String} key - key for the data in redis HashMap
   * @returns {Promise<number>} - The number of keys that were removed.
   */
  async deleteExternalUser(
    key: string,
    data: UserDto,
    apiCode: string
  ): Promise<number> {
    return this.appRedisService.saveHashMapNew(key, data, apiCode);
  }

  async getExternalUser(key: string): Promise<any> {
    return await this.appRedisService.getHashMapNew(key);
  }

  // mapUserInRedisToAppUserDtoNew(userInRedis: UserInRedis): UserDto {
  //   const appUserDto: UserDto = new UserDto(
  //     userInRedis.data,
  //     userInRedis.time_expire,
  //     userInRedis.authtoken
  //   );

  //   return appUserDto;
  // }

  // mapAppUserDtoToUserInRedisNew(appUserDto: UserDto): UserInRedis {
  //   const userInRedis: UserInRedis = new UserInRedis(
  //     appUserDto.data,
  //     appUserDto.time_expire,
  //     appUserDto.authtoken
  //   );

  //   return userInRedis;
  // }
}

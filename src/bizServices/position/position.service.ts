import { Injectable } from "@nestjs/common";
import PositionDB from "src/biz/mysql/position/positionDB";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export default class PositionBizService {
  constructor(private readonly positionDB: PositionDB) {}

  async getPositions(apiCode: string): Promise<any> {
    try {
      return await this.positionDB.getPositions();
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}

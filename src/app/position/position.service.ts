import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import PositionBizService from "src/bizServices/position/position.service";

@Injectable()
export default class PositionService {
  constructor(private readonly positionBizService: PositionBizService) {}

  async getPositions(apiCode): Promise<any> {
    const positions = await this.positionBizService.getPositions(apiCode);
    return new CommonResponse(null, 200, "OK", positions);
  }
}

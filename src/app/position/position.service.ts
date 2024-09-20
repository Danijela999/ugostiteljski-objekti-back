import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import PositionBizService from "src/bizServices/position/position.service";
import GetPositionsByRestaurantDto from "./dto/positionsByRestaurant.dto";

@Injectable()
export default class PositionService {
  constructor(private readonly positionBizService: PositionBizService) {}

  async getPositions(apiCode: string): Promise<any> {
    const positions = await this.positionBizService.getPositions(apiCode);
    return new CommonResponse(null, 200, "OK", positions);
  }

  async getPositionsByRestaurant(
    params: GetPositionsByRestaurantDto,
    apiCode: string
  ): Promise<any> {
    const positions = await this.positionBizService.getPositionsByRestaurant(
      params,
      apiCode
    );
    return new CommonResponse(null, 200, "OK", positions);
  }
}

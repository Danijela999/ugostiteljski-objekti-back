import { ApiProperty } from "@nestjs/swagger";

export default class GetPositionsByRestaurantDto {
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
}

import { ApiProperty } from "@nestjs/swagger";

export default class GetTableByTableIdAndRestaurantIdDto {
  @ApiProperty({ example: 1 })
  readonly tableId: number;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
}

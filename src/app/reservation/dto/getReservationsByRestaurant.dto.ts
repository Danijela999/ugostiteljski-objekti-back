import { ApiProperty } from "@nestjs/swagger";

export default class GetReservationsByRestaurantDto {
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
}

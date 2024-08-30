import { ApiProperty } from "@nestjs/swagger";

export default class GetReservationByResIdTableDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
  @ApiProperty({ example: 1 })
  readonly tableId: number;
}

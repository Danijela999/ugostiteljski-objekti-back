import { ApiProperty } from "@nestjs/swagger";

export default class DeleteReservationDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
  @ApiProperty({ example: 1 })
  readonly tableId: number;
  @ApiProperty({ example: 1 })
  readonly time: Date;
}

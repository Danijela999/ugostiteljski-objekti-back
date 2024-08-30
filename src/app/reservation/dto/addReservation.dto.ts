import { ApiProperty } from "@nestjs/swagger";

export default class AddReservationDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
  @ApiProperty({ example: 1 })
  readonly tableId: number;
  @ApiProperty({ example: "2024-03-17T15:00:00Z" })
  readonly time: Date;
  @ApiProperty({ example: "note" })
  readonly note: string;
}

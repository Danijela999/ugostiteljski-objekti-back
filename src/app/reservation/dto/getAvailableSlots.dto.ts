import { ApiProperty } from "@nestjs/swagger";

export default class GetAvailableSlotsDto {
  @ApiProperty({ example: 1 })
  readonly positionId: number;
  @ApiProperty({ example: 1 })
  readonly categoryId: number;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
  @ApiProperty({ example: 1 })
  readonly chairs: number;
  @ApiProperty({ example: "26-OCT-2024" })
  readonly dateReservation: string;
}

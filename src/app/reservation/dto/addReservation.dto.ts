import { ApiProperty } from "@nestjs/swagger";

export default class AddReservationDto {
  @ApiProperty({ example: "danijela.user@gmail.com" })
  readonly userId: string;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
  @ApiProperty({ example: 1 })
  readonly positionId: number;
  @ApiProperty({ example: 1 })
  readonly categoryId: number;
  @ApiProperty({ example: "2024-03-17T15:00:00Z" })
  readonly startDateTime: string;
}

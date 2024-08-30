import { ApiProperty } from "@nestjs/swagger";

export default class UpdateChairsDto {
  @ApiProperty({ example: 1 })
  readonly tableId: number;
  @ApiProperty({ example: 6 })
  readonly chairs: number;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
}

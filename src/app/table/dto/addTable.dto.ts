import { ApiProperty } from "@nestjs/swagger";

export default class AddTableDto {
  @ApiProperty({ example: 1 })
  readonly tableId: number;
  @ApiProperty({ example: "comment" })
  readonly comment: string;
  @ApiProperty({ example: 6 })
  readonly chairs: number;
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
}

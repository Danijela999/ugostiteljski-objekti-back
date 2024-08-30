import { ApiProperty } from "@nestjs/swagger";

export default class GetTablesDto {
  @ApiProperty({ example: 1 })
  readonly restaurantId: number;
}

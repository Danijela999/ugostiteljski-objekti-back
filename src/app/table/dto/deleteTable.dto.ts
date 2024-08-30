import { ApiProperty } from "@nestjs/swagger";

export default class DeleteTableDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
}

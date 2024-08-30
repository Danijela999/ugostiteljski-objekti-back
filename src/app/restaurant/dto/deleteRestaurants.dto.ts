import { ApiProperty } from "@nestjs/swagger";

export default class DeleteRestaurantDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
}

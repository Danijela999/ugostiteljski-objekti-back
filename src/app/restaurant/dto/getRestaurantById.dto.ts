import { ApiProperty } from "@nestjs/swagger";

export default class GetRestaurantByIdDto {
  @ApiProperty({ example: 1 })
  readonly id: number;
}

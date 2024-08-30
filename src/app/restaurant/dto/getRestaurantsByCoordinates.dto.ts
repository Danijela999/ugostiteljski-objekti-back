import { ApiProperty } from "@nestjs/swagger";

export default class GetRestaurantByCoordinatesDto {
  @ApiProperty({ example: 40.0 })
  readonly latitude: number;
  @ApiProperty({ example: 40.0 })
  readonly longitude: number;
}

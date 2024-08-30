import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export default class GetRestaurantByNameDto {
  @ApiProperty({ example: "name" })
  readonly name: string;
  @ApiPropertyOptional({ example: "address" })
  readonly address: string;
}

import { ApiProperty } from "@nestjs/swagger";

export default class AddRestaurantDto {
  @ApiProperty({ example: "name" })
  readonly name: string;
  @ApiProperty({ example: "description" })
  readonly description: string;
  @ApiProperty({ example: "address" })
  readonly address: string;
  @ApiProperty({ example: 40.0 })
  readonly latitude: number;
  @ApiProperty({ example: 40.0 })
  readonly longitude: number;
  @ApiProperty({ example: "09:00" })
  readonly startTime: string;
  @ApiProperty({ example: "23:00" })
  readonly endTime: string;
}

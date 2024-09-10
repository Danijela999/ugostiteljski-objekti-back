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
  @ApiProperty({ example: "https://storez.s3.eu-north-1.amazonaws.com/image_20240830_002629_xavenp.jpg" })
  readonly imageUrl: string;
  @ApiProperty()
  readonly categories: [CategoryDto]; 
  @ApiProperty()
  readonly tableData: [TableDataDto];
  @ApiProperty({ example: "Danijela" })
  readonly email: string;
}

class CategoryDto {
  readonly checked: Boolean;
  readonly id: number;
  readonly minutes: number;
  readonly name: string;
}

class TableDataDto {
  readonly chairs: number;
  readonly position: PositionDto;
  readonly tables: number;
}

class PositionDto {
  readonly id: number;
  readonly name: string;
}

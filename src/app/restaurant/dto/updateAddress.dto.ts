import { ApiProperty } from "@nestjs/swagger";

export default class UpdateAddressDto {
  @ApiProperty({ example: 2 })
  readonly id: number;
  @ApiProperty({ example: "address" })
  readonly address: string;
}

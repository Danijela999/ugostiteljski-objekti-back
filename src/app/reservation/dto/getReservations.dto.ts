import { ApiProperty } from "@nestjs/swagger";

export default class GetReservationsDto {
  @ApiProperty({ example: "danijela.grbovic@gmail.com" })
  readonly email: string;
}

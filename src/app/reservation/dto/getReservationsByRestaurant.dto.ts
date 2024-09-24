import { ApiProperty } from "@nestjs/swagger";

export default class GetReservationsByRestaurantDto {
  @ApiProperty({ example: "danijela.admin@gmail.com" })
  readonly email: string;
}

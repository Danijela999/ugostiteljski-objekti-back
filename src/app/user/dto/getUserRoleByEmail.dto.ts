import { ApiProperty } from "@nestjs/swagger";

export default class GetUserRoleByEmailDto {
  @ApiProperty({ example: "danijela" })
  readonly email: string;
}

import { ApiProperty } from "@nestjs/swagger";

export default class ChangePasswordDto {
  @ApiProperty({ example: "email@gmail.com" })
  readonly email: string;
  @ApiProperty({ example: "password" })
  readonly password: string;
}

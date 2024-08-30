import { ApiProperty } from "@nestjs/swagger";

export default class ForgotPasswordDto {
  @ApiProperty({ example: "email@gmail.com" })
  readonly email: string;
}

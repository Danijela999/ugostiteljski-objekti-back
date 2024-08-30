import { ApiProperty } from "@nestjs/swagger";

export default class LogoutDto {
  @ApiProperty({ example: "accessToken" })
  readonly accessToken: string;
  @ApiProperty({ example: "refreshToken" })
  readonly refreshToken: string;
}

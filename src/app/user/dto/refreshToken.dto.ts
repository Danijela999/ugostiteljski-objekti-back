import { ApiProperty } from "@nestjs/swagger";

export default class RefreshTokenDto {
  @ApiProperty({ example: "refreshToken" })
  readonly token: string;
}

import { ApiProperty } from "@nestjs/swagger";

export default class ChangeProfilePhotoDto {
  @ApiProperty({ example: "email@gmail.com" })
  readonly email: string;
  @ApiProperty({ example: "photoUrl" })
  readonly photoUrl: string;
}

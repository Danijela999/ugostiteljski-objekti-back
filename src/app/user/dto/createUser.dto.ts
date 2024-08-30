import { ApiProperty } from "@nestjs/swagger";

export default class CreateUserDto {
  @ApiProperty({ example: "email@gmail.com" })
  readonly email: string;
  @ApiProperty({ example: "name" })
  readonly firstName: string;
  @ApiProperty({ example: "lastName" })
  readonly lastName: string;
  @ApiProperty({ example: "password" })
  readonly password: string;
}

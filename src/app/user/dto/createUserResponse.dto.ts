/**
 * A DTO (Data Transfer Object) schemas an object that defines how the data will be sent over the network.
 * We recommend using classes here: Classes are part of the JavaScript ES6 standard,
 * and therefore they are preserved as real entities in the compiled JavaScript.
 */

import { ApiProperty } from "@nestjs/swagger";

class CreateUserData {
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  time_expire: number;
  @ApiProperty()
  authtoken: string;
}

export default class CreateUserResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: CreateUserData;

  @ApiProperty()
  code: number;
}

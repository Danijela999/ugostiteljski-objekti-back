import { ApiProperty } from "@nestjs/swagger";

export default class GetUserByEmailDto {
  @ApiProperty({ example: 'danijela'  })
  readonly email: string;
}

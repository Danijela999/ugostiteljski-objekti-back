import { ApiProperty } from "@nestjs/swagger";

class UserRole {
  readonly email: string;
  readonly privilegeId: number;
}

export default class ChangeRolesDto {
  @ApiProperty({ example: [{ email: "email@gmail.com", privilegeId: 1 }] })
  readonly users: UserRole[];
}

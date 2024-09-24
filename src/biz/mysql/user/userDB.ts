import { Injectable } from "@nestjs/common";
import CreateUserDto from "src/app/user/dto/createUser.dto";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import * as bcrypt from "bcrypt";
import ChangePasswordDto from "src/app/user/dto/changePassword.dto";
import ChangeProfilePhotoDto from "src/app/user/dto/changeProfilePhoto.dto";
import ChangeRolesDto from "src/app/user/dto/changeRoles.dto";
import GetUserRoleByEmailDto from "src/app/user/dto/getUserRoleByEmail.dto";

@Injectable()
export default class UserDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async createUser(createUserParams: CreateUserDto): Promise<any> {
    const { email, firstName, lastName, password } = createUserParams;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const sql = `INSERT INTO users (email, first_name, last_name, password, privilege_id) VALUES ("${email}", "${firstName}", "${lastName}", "${hash}", 1);`;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    const sql = `SELECT * FROM users where email like "${email}";`;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async changePassword(changePasswordParams: ChangePasswordDto): Promise<any> {
    const { password, email } = changePasswordParams;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const sql = `UPDATE users set password = "${hash}" where email = "${email}";`;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }
  async changeProfilePhoto(
    changePhotoParams: ChangeProfilePhotoDto
  ): Promise<any> {
    const { photoUrl, email } = changePhotoParams;
    const sql = `UPDATE users set img_url = "${photoUrl}" where email = "${email}";`;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<any> {
    const sql = `
      select email, u.privilege_id as privilegeId
      from users u
      join privilege p on u.privilege_id = p.privilege_id
      where u.privilege_id in (1, 2);
    `;

    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getUsersRoleByEmail(params: GetUserRoleByEmailDto): Promise<any> {
    const { email } = params;
    const sql = `
      select email, u.privilege_id as privilegeId
      from users u
      join privilege p on u.privilege_id = p.privilege_id
      where u.privilege_id in (1, 2)
        and email like '%${email}%';
    `;

    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async changeRoles(params: ChangeRolesDto): Promise<Boolean> {
    const { users } = params;
    try {
      for (const user of users) {
        const { email, privilegeId } = user;
        let sql = `
        UPDATE users 
        set privilege_id = ${privilegeId}
        where email = '${email}'`;

        await MySQLClient.runQuery(
          dbNamesEnum.DB,
          sql,
          this.mySqlConfig.config[dbNamesEnum.DB]
        );
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

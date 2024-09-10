import { Injectable } from "@nestjs/common";
import CreateUserDto from "src/app/user/dto/createUser.dto";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import * as bcrypt from "bcrypt";
import ChangePasswordDto from "src/app/user/dto/changePassword.dto";
import ChangeProfilePhotoDto from "src/app/user/dto/changeProfilePhoto.dto";
import GetUserByEmailDto from "src/app/user/dto/getUserByEmail.dto";

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
  async changeProfilePhoto(changePhotoParams: ChangeProfilePhotoDto): Promise<any> {
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
}

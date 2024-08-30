import { Injectable } from "@nestjs/common";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";

@Injectable()
export default class PositionDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async getPositions(): Promise<any> {
    const sql = `SELECT position_id as id, name FROM positions;`;
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

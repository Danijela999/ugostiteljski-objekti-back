import { Injectable } from "@nestjs/common";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";

@Injectable()
export default class CategoryDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async getCategories(): Promise<any> {
    const sql = `SELECT category_id as id, name FROM categories;`;
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

import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import { Injectable } from "@nestjs/common";
import MySQLConfig from "./config";

@Injectable()
export default class MySQLBuilder {
  constructor(private readonly mysqlConfig: MySQLConfig) {}

  async createMySQLClients() {
    const promiseArray = [];
    Object.values(dbNamesEnum).forEach((item) => {
      promiseArray.push(
        MySQLClient.getPool(item, this.mysqlConfig.config[item])
      );
    });

    try {
      let res = await Promise.allSettled(promiseArray);
      res.forEach((pool, index) => {
        if (pool.status !== "fulfilled") {
          console.log(`Connection to db on index ${index} failed`);
        }
      });
    } catch (error) {
      console.log(`Application failed to start in ${__filename}, because of:`);
      console.log(error);
      throw error;
    }
  }
}

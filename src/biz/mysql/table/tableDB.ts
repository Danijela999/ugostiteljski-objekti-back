import { Injectable } from "@nestjs/common";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import AddTableDto from "src/app/table/dto/addTable.dto";
import GetTablesDto from "src/app/table/dto/getTables.dto";
import DeleteTableDto from "src/app/table/dto/deleteTable.dto";
import UpdateChairsDto from "src/app/table/dto/updateChairs.dto";
import GetTableByTableIdAndRestaurantIdDto from "src/app/table/dto/getTablesByIdAndRes.dto";

@Injectable()
export default class TableDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async addTable(addTableParams: AddTableDto): Promise<any> {
    const { tableId, chairs, comment, restaurantId } = addTableParams;

    const sql = `INSERT INTO tables (table_id, restaurant_id, comment, chairs) VALUES (${tableId}, ${restaurantId}, "${comment}", ${chairs});`;
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

  async getTablesPerRestaurant(getTablesParams: GetTablesDto): Promise<any> {
    const { restaurantId } = getTablesParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select table_id as tableId, comment, chairs from tables where restaurant_id = ${restaurantId}`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteTable(deleteTableParams: DeleteTableDto): Promise<any> {
    const { id } = deleteTableParams;

    const sql = `DELETE FROM tables WHERE table_id = ${id};`;
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

  async getTablesByTableIdRestaurantId(
    getTablesByTableIdRestaurantIdParams: GetTableByTableIdAndRestaurantIdDto
  ): Promise<any> {
    const { restaurantId, tableId } = getTablesByTableIdRestaurantIdParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select * from tables where restaurant_id = ${restaurantId} and table_id = ${tableId}`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async updateChairs(updateChairsParams: UpdateChairsDto): Promise<any> {
    const { tableId, chairs, restaurantId } = updateChairsParams;

    const sql = `UPDATE tables set chairs = ${chairs} WHERE table_id = ${tableId} and restaurant_id = ${restaurantId};`;
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

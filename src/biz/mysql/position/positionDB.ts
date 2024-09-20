import { Injectable } from "@nestjs/common";
import GetPositionsByRestaurantDto from "src/app/position/dto/positionsByRestaurant.dto";
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

  async getPositionsByRestaurant(
    params: GetPositionsByRestaurantDto
  ): Promise<any> {
    const { restaurantId } = params;
    const sql = `
      SELECT rp.position_id as id, 
        name 
      FROM restaurant_positions rp
      JOIN positions p
        on rp.position_id = p.position_id
      where rp.restaurant_id = ${restaurantId};
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
}

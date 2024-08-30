import { Injectable } from "@nestjs/common";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import AddReservationDto from "src/app/reservation/dto/addReservation.dto";
import DeleteReservationDto from "src/app/reservation/dto/deleteReservation.dto";
import GetReservationsDto from "src/app/reservation/dto/getReservations.dto";
import UpdateReservationDto from "src/app/reservation/dto/updateReservation.dto";
import GetReservationByResIdTableDto from "src/app/reservation/dto/getReservationByResIdTable.dto";
const moment = require("moment");
@Injectable()
export default class ReservationDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async addReservation(AddReservationParams: AddReservationDto): Promise<any> {
    const { userId, restaurantId, tableId, time, note } = AddReservationParams;
    const formatedDatetime = moment(time).format("YYYY-MM-DD HH:mm:ss");
    const sql = `INSERT INTO reservations (user_id, restaurant_id, table_id, time, note) VALUES (${userId}, ${restaurantId}, ${tableId}, "${formatedDatetime}", "${note}");`;
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

  async getReservationsPerUser(
    getReservationParams: GetReservationsDto
  ): Promise<any> {
    const { userId } = getReservationParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select u.first_name as firstName,
            u.last_name as lastName,
            r.name,
            r.address,
            t.table_id as tableId,
            t.comment, 
            t.chairs as chairs,
            time,
            note
            from reservations rs inner join users u on rs.user_id = u.id
            left join restaurants r on rs.restaurant_id = r.id
            left join tables t on rs.table_id = t.table_id
            where user_id = ${userId}`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(
    deleteReservationParams: DeleteReservationDto
  ): Promise<any> {
    const { userId, restaurantId, tableId, time } = deleteReservationParams;
    const formatedDatetime = moment(time).format("YYYY-MM-DD HH:mm:ss");
    const sql = `DELETE FROM reservations WHERE user_id = ${userId} and restaurant_id = ${restaurantId} and table_id = ${tableId} and time = "${formatedDatetime}";`;
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

  async updateReservation(
    updateReservationParams: UpdateReservationDto
  ): Promise<any> {
    const { userId, restaurantId, tableId, time } = updateReservationParams;
    const formatedDatetime = moment(time).format("YYYY-MM-DD HH:mm:ss");
    const sql = `UPDATE reservations set time = '${formatedDatetime}' WHERE user_id = ${userId} and restaurant_id = ${restaurantId} and table_id = ${tableId};`;
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

  async getReservation(
    getReservationParams: GetReservationByResIdTableDto
  ): Promise<any> {
    const { userId, restaurantId, tableId } = getReservationParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select *
            from reservations 
            where user_id = ${userId}
            and restaurant_id = ${restaurantId}
            and table_id = ${tableId}`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }
}

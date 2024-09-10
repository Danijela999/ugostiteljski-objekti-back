import { Injectable } from "@nestjs/common";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import AddReservationDto from "src/app/reservation/dto/addReservation.dto";
import DeleteReservationDto from "src/app/reservation/dto/deleteReservation.dto";
import GetReservationsDto from "src/app/reservation/dto/getReservations.dto";
import UpdateReservationDto from "src/app/reservation/dto/updateReservation.dto";
import GetReservationByResIdTableDto from "src/app/reservation/dto/getReservationByResIdTable.dto";
import GetAvailableSlotsDto from "src/app/reservation/dto/getAvailableSlots.dto";
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

  async getAvailableSlots(
    getAvailableSlotsParams: GetAvailableSlotsDto
  ): Promise<any> {
    const { restaurantId, categoryId, positionId, chairs } = getAvailableSlotsParams;
    try {
      const sql1 = `
        select duration, start_time as startTime, end_time as endTime
        from restaurants r
        left join restaurant_categories rc
          ON r.id = rc.restaurant_id
        where r.id = ${restaurantId}
	        and rc.category_id = ${categoryId}
      `;
      const res = await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql1,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );

      const {data} = res;
      const { duration, startTime, endTime} = data[0];
      const durationParts = duration / 30;
      const sql2 = `
        select count(*) as tablesNum
        from tables
        where restaurant_id = ${restaurantId}
          and position_id = ${positionId}
          and chairs = ${chairs}
      `;
      const res2 = await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql2,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );

      const data2 = res2.data;
      const {tablesNum} = data2[0];
      let start = new Date();
      start.setHours(startTime, 0, 0, 0); 
      const timePoint = (endTime - startTime - 1) * 2;
      const halfHour = 30 * 60 * 1000; // 30 minuta u milisekundama
      let termins = [];
      for (let i = 0; i < timePoint; i++) {
        let firstTime = new Date(start.getTime() + i * halfHour); 
        let secondTime = new Date(start.getTime() + (i + 1) * halfHour);
        let sql3 = `
          select ${tablesNum} - count(*) as freeTables
          from reservations r
          left join tables t
	          on r.table_id = t.table_id
          where t.chairs = ${chairs}
	          and r.restaurant_id = ${restaurantId}
            and r.position_id = ${positionId}
            and ((${firstTime} < start_date_time and ${secondTime} > start_date_time) 
              or (${firstTime} >= start_date_time and ${firstTime} < end_date_time))
        `;
        //Broj postojecih rezervacija za termin od first od second time
        let res3 = await MySQLClient.runQuery(
          dbNamesEnum.DB,
          sql3,
          this.mySqlConfig.config[dbNamesEnum.DB]
        );

        let data3 = res3.data;
        const {freeTables} = data3[0];
        if (freeTables > 0) {
          termins.push(true)
        } else {
          termins.push(false);
        }

      }

      let endTermins = [];
      for (let i = 0; i < termins.length; i++) {
        for (let j = i; j < i + durationParts; j++) {
          if (!termins[j]) {
            endTermins.push(false);
            break;
          }
          if (j == i + durationParts - 1) {
            endTermins.push(true);
          }
        }
      }

      return endTermins;
    } catch (error) {
      throw error;
    }
  }
}

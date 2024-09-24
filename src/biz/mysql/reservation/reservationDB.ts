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
import GetReservationsByRestaurantDto from "src/app/reservation/dto/getReservationsByRestaurant.dto";
const moment = require("moment");
@Injectable()
export default class ReservationDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async addReservation(addReservationParams: AddReservationDto): Promise<any> {
    const {
      userId,
      restaurantId,
      positionId,
      categoryId,
      startDateTime,
    } = addReservationParams;
    try {
      const sql1 = `
        select duration
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

      const { duration } = res[0];
      console.log(startDateTime);
      // const localDate = new Date(`${startDateTime} UTC`);
      const startTime = new Date(`${startDateTime} UTC`);
      console.log(startTime);
      const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

      const firstTime = startTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const secondTime = endTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const sql2 = `
        select min(t.table_id) as tableId
        from tables t
        where t.restaurant_id = ${restaurantId}
          and t.position_id = ${positionId}
          and t.table_id not in (
            select table_id
            from reservations
            where position_id = ${positionId}
              and restaurant_id = ${restaurantId}
              and (('${firstTime}' < start_date_time and '${secondTime}' > start_date_time) 
              or ('${firstTime}' >= start_date_time and '${firstTime}' < end_date_time))
          )
      `;

      const res2 = await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql2,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );

      const { tableId } = res2[0];
      console.log(tableId);
      const sql = `
        INSERT INTO reservations (
          user_id, 
          restaurant_id, 
          position_id, 
          category_id, 
          start_date_time, 
          end_date_time,
          table_id
        ) VALUES (
          "${userId}", 
          ${restaurantId}, 
          ${positionId}, 
          ${categoryId}, 
          '${startTime}',
          '${endTime}',
          ${tableId}
        );
      `;

      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getReservationsPerUser(
    getReservationParams: GetReservationsDto
  ): Promise<any> {
    const { email } = getReservationParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `
          select r.img_url as image,
            r.name,
            rs.start_date_time || ' - ' || rs.end_date_time as time, 
            p.name as position,
            numberOfChairs as guestCount
          from reservations rs inner join users u 
            on rs.user_id = u.email
          left join restaurants r 
            on rs.restaurant_id = r.id
          left join tables t 
            on rs.table_id = t.table_id
          left join positions p
            on rs.position_id = p.position_id
          where email = ${email}`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getActiveReservationsPerUser(
    getReservationParams: GetReservationsDto
  ): Promise<any> {
    const { email } = getReservationParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `
          select r.img_url as image,
            r.name,
            rs.start_date_time || ' - ' || rs.end_date_time as time, 
            p.name as position,
            numberOfChairs as guestCount
          from reservations rs inner join users u 
            on rs.user_id = u.email
          left join restaurants r 
            on rs.restaurant_id = r.id
          left join tables t 
            on rs.table_id = t.table_id
          left join positions p
            on rs.position_id = p.position_id
          where email = '${email}'
            and rs.start_date_time > sysdate()`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getActiveReservationsPerRestaurant(
    getReservationParams: GetReservationsByRestaurantDto
  ): Promise<any> {
    const { restaurantId } = getReservationParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `
          select
            u.email,
            u.first_name as firstName,
            u.last_name as lastName, 
            r.img_url as image,
            r.name,
            rs.start_date_time || ' - ' || rs.end_date_time as time, 
            p.name as position,
            numberOfChairs as guestCount
          from reservations rs inner join users u 
            on rs.user_id = u.email
          left join restaurants r 
            on rs.restaurant_id = r.id
          left join tables t 
            on rs.table_id = t.table_id
          left join positions p
            on rs.position_id = p.position_id
          where rs.restaurant_id = '${restaurantId}'
            and rs.start_date_time > sysdate()`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(
    deleteReservationParams: DeleteReservationDto
  ): Promise<any> {
    const { email, restaurantId, tableId, time } = deleteReservationParams;
    const formatedDatetime = moment(time).format("YYYY-MM-DD HH:mm:ss");
    const sql = `DELETE FROM reservations WHERE user_id = '${email}' and restaurant_id = ${restaurantId} and table_id = ${tableId} and time = "${formatedDatetime}";`;
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
    const {
      restaurantId,
      categoryId,
      positionId,
      chairs,
      dateReservation,
    } = getAvailableSlotsParams;
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

      const { duration, startTime, endTime } = res[0];
      const durationParts = duration / 30;
      const sql2 = `
        select count(*) as tablesNum
        from tables
        where restaurant_id = ${restaurantId}
          and position_id = ${positionId}
          and numberOfChairs = ${chairs}
      `;

      const res2 = await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql2,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
      const { tablesNum } = res2[0];

      let start = new Date(dateReservation);
      let startTimeInt = Number(startTime.split(":")[0]);
      let endTimeInt = Number(endTime.split(":")[0]);
      if (endTimeInt === 0) {
        endTimeInt = 24;
      }

      start.setHours(startTimeInt, 0, 0, 0);
      let timePoint = (endTimeInt - startTimeInt) * 2;
      if (endTimeInt <= startTimeInt) {
        timePoint = (endTimeInt + 24 - startTimeInt) * 2;
      }
      console.log(timePoint);
      const halfHour = 30 * 60 * 1000; // 30 minuta u milisekundama
      let termins = [];
      for (let i = 0; i < timePoint; i++) {
        let firstTime = new Date(start.getTime() + i * halfHour)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        let secondTime = new Date(start.getTime() + (i + 1) * halfHour)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        let sql3 = `
          select ${tablesNum} - count(*) as freeTables
          from reservations r
          left join tables t
	          on r.table_id = t.table_id
          where t.numberOfChairs = ${chairs}
	          and r.restaurant_id = ${restaurantId}
            and r.position_id = ${positionId}
            and (('${firstTime}' < start_date_time and '${secondTime}' > start_date_time) 
              or ('${firstTime}' >= start_date_time and '${firstTime}' < end_date_time))
        `;
        //Broj postojecih rezervacija za termin od first od second time
        let res3 = await MySQLClient.runQuery(
          dbNamesEnum.DB,
          sql3,
          this.mySqlConfig.config[dbNamesEnum.DB]
        );

        const { freeTables } = res3[0];
        if (freeTables > 0) {
          termins.push(true);
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

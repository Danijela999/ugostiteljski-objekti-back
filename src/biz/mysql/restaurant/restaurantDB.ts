import { Injectable } from "@nestjs/common";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import AddRestaurantDto from "src/app/restaurant/dto/addRestaurants.dto";
import DeleteRestaurantDto from "src/app/restaurant/dto/deleteRestaurants.dto";
import GetRestaurantByIdDto from "src/app/restaurant/dto/getRestaurantById.dto";
import GetRestaurantByNameDto from "src/app/restaurant/dto/getRestaurantByName.dto";
import UpdateAddressDto from "src/app/restaurant/dto/updateAddress.dto";
import GetRestaurantByCoordinatesDto from "src/app/restaurant/dto/getRestaurantsByCoordinates.dto";

@Injectable()
export default class RestaurantDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async addRestaurant(addRestaurantParams: AddRestaurantDto): Promise<any> {
    const {
      name,
      description,
      address,
      latitude,
      longitude,
      startTime,
      endTime,
      imageUrl,
      categories,
      tableData,
      email,
    } = addRestaurantParams;

    try {
      const sql = `INSERT INTO restaurants (name, description, address, latitude, longitude, start_time, end_time, img_url, user_id) VALUES ("${name}", "${description}", "${address}", ${latitude}, ${longitude},"${startTime}", "${endTime}", "${imageUrl}", "${email}");`;
      const res1 = await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
      const restaurantNew = await this.getRestaurantByNameAndAdress({
        name,
        address,
      });
      console.log(restaurantNew);
      const { id } = restaurantNew[0];
      for (const category of categories) {
        if (category.checked) {
          let sql2 = `INSERT INTO restaurant_categories (restaurant_id, category_id, duration) VALUES (${id}, ${category.id}, ${category.minutes})`;
          await MySQLClient.runQuery(
            dbNamesEnum.DB,
            sql2,
            this.mySqlConfig.config[dbNamesEnum.DB]
          );
        }
      }

      const uniquePositions = new Set();

      for (const table of tableData) {
        let positionId = table.position.id;
        uniquePositions.add(positionId);
      }

      for (const positionId of uniquePositions) {
        let sql2 = `INSERT INTO restaurant_positions (restaurant_id, position_id) VALUES (${id}, ${positionId})`;

        await MySQLClient.runQuery(
          dbNamesEnum.DB,
          sql2,
          this.mySqlConfig.config[dbNamesEnum.DB]
        );
      }

      for (const table of tableData) {
        let positionId = table.position.id;

        let numOfTable = table.tables;
        for (let i = 0; i < numOfTable; i++) {
          let sql3 = `INSERT INTO tables (restaurant_id, position_id, numberOfChairs) VALUES (${id}, ${positionId}, ${table.chairs})`;
          await MySQLClient.runQuery(
            dbNamesEnum.DB,
            sql3,
            this.mySqlConfig.config[dbNamesEnum.DB]
          );
        }
      }

      return res1;
    } catch (error) {
      throw error;
    }
  }

  async getRestaurants(): Promise<any> {
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select id, name, address, description, 
            start_time as startTime, 
            end_time as endTime,
            latitude, longitude,
            img_url as imageUrl from restaurants order by id desc`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantByCoordinates(
    restaurantByCoordinatesParams: GetRestaurantByCoordinatesDto
  ): Promise<any> {
    const { latitude, longitude } = restaurantByCoordinatesParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `SELECT id, name, address, description, 
            start_time as startTime, 
            end_time as endTime,
            latitude, longitude,
            (6371 * acos(cos(radians(${latitude})) 
              * cos(radians(latitude)) 
              * cos(radians(longitude) - radians(${longitude})) 
              + sin(radians(${latitude})) 
              * sin(radians(latitude)))
            ) AS distance,
             img_url as imageUrl
          FROM restaurants
          ORDER BY distance
          ;`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantById(
    getRestaurantByIdParams: GetRestaurantByIdDto
  ): Promise<any> {
    const { id } = getRestaurantByIdParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select * from restaurants where id = ${id}`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantByNameAndAdress(
    getRestaurantByNameParams: GetRestaurantByNameDto
  ): Promise<any> {
    const { name, address } = getRestaurantByNameParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select * from restaurants where upper(name) = upper("${name}") and upper(address) = upper("${address}");`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantByName(
    getRestaurantByNameParams: GetRestaurantByNameDto
  ): Promise<any> {
    const { name } = getRestaurantByNameParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select id, name, address, description, start_time as startTime, end_time as endTime, img_url as imageUrl
         from restaurants where upper(name) like upper("%${name}%");`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteRestaurant(
    deleteRestaurantParams: DeleteRestaurantDto
  ): Promise<any> {
    const { id } = deleteRestaurantParams;

    const sql = `DELETE FROM restaurants WHERE ID = ${id};`;
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

  async updateAddressForRestaurant(
    updateAddressParams: UpdateAddressDto
  ): Promise<any> {
    const { id, address } = updateAddressParams;

    const sql = `UPDATE restaurants set address = "${address}" WHERE ID = ${id};`;
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

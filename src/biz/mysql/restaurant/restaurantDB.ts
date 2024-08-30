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
    } = addRestaurantParams;

    const sql = `INSERT INTO restaurants (name, description, address, latitude, longitude, start_time, end_time) VALUES ("${name}", "${description}", "${address}", ${latitude}, ${longitude},"${startTime}", "${endTime}");`;
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

  async getRestaurants(): Promise<any> {
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        "select * from restaurants",
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
            ) AS distance
          FROM restaurants
          ORDER BY distance
          LIMIT 4;`,
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
        `select id, name, address, description, start_time as startTime, end_time as endTime from restaurants where upper(name) like upper("%${name}%");`,
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

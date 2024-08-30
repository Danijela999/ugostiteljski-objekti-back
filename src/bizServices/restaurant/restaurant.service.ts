import { Injectable } from "@nestjs/common";
import AddRestaurantDto from "src/app/restaurant/dto/addRestaurants.dto";
import DeleteRestaurantDto from "src/app/restaurant/dto/deleteRestaurants.dto";
import GetRestaurantByIdDto from "src/app/restaurant/dto/getRestaurantById.dto";
import GetRestaurantByNameDto from "src/app/restaurant/dto/getRestaurantByName.dto";
import GetRestaurantByCoordinatesDto from "src/app/restaurant/dto/getRestaurantsByCoordinates.dto";
import UpdateAddressDto from "src/app/restaurant/dto/updateAddress.dto";
import RestaurantDB from "src/biz/mysql/restaurant/restaurantDB";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export default class RestaurantBizService {
  constructor(private readonly restaurantDB: RestaurantDB) {}

  async addRestaurant(
    addRestaurantParams: AddRestaurantDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.restaurantDB.addRestaurant(addRestaurantParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getRestaurants(apiCode: string): Promise<any> {
    try {
      return await this.restaurantDB.getRestaurants();
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getRestaurantById(
    getRestaurantByIdParams: GetRestaurantByIdDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.restaurantDB.getRestaurantById(getRestaurantByIdParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getRestaurantsByCoordinates(
    restaurantsByCoordinatesParams: GetRestaurantByCoordinatesDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.restaurantDB.getRestaurantByCoordinates(
        restaurantsByCoordinatesParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getRestaurantByNameAndAdress(
    getRestaurantByNameParams: GetRestaurantByNameDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.restaurantDB.getRestaurantByNameAndAdress(
        getRestaurantByNameParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getRestaurantByName(
    getRestaurantByNameParams: GetRestaurantByNameDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.restaurantDB.getRestaurantByName(
        getRestaurantByNameParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async deleteRestaurant(
    deleteRestaurantParams: DeleteRestaurantDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.restaurantDB.deleteRestaurant(deleteRestaurantParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async updateAddressForRestaurant(
    updateAddressParams: UpdateAddressDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.restaurantDB.updateAddressForRestaurant(
        updateAddressParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}

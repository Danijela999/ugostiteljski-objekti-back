import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import RestaurantBizService from "src/bizServices/restaurant/restaurant.service";
import AddRestaurantDto from "./dto/addRestaurants.dto";
import DeleteRestaurantDto from "./dto/deleteRestaurants.dto";
import GetRestaurantByIdDto from "./dto/getRestaurantById.dto";
import UpdateAddressDto from "./dto/updateAddress.dto";
import {
  CustomBadRequestExceptionApiG,
  CustomNotFoundExceptionApiG,
} from "src/http/apiGee/http.apiGee.exception";
import GetRestaurantByCoordinatesDto from "./dto/getRestaurantsByCoordinates.dto";
import GetRestaurantByNameDto from "./dto/getRestaurantByName.dto";

@Injectable()
export default class RestaurantService {
  constructor(private readonly restaurantBizService: RestaurantBizService) {}

  async addRestaurant(
    addRestaurantParams: AddRestaurantDto,
    apiCode: string
  ): Promise<any> {
    const { name, address } = addRestaurantParams;
    const restaurant = await this.restaurantBizService.getRestaurantByNameAndAdress(
      {
        name,
        address,
      },
      apiCode
    );
    if (restaurant.length > 0) {
      throw new CustomBadRequestExceptionApiG(
        apiCode,
        "Restaurant already exists"
      ).exception;
    }
    const result = await this.restaurantBizService.addRestaurant(
      addRestaurantParams,
      apiCode
    );
    return new CommonResponse(null, 201, "Created", result, true);
  }

  async getRestaurants(apiCode: string): Promise<any> {
    const restaurants = await this.restaurantBizService.getRestaurants(apiCode);
    if (restaurants.length === 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "Restaurants not found")
        .exception;
    }
    return new CommonResponse(null, 200, "OK", restaurants);
  }

  async getRestaurantsByCoordinates(
    restaurantsByCoordinatesParams: GetRestaurantByCoordinatesDto,
    apiCode: string
  ): Promise<any> {
    const restaurants = await this.restaurantBizService.getRestaurantsByCoordinates(
      restaurantsByCoordinatesParams,
      apiCode
    );
    if (restaurants.length === 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "Restaurant not found")
        .exception;
    }
    return new CommonResponse(null, 200, "OK", restaurants);
  }

  async getRestaurantsByName(
    restaurantsByNameParams: GetRestaurantByNameDto,
    apiCode: string
  ): Promise<any> {
    const restaurants = await this.restaurantBizService.getRestaurantByName(
      restaurantsByNameParams,
      apiCode
    );
    if (restaurants.length === 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "Restaurant not found")
        .exception;
    }
    return new CommonResponse(null, 200, "OK", restaurants);
  }

  async getRestaurantById(
    getRestaurantByIdParams: GetRestaurantByIdDto,
    apiCode: string
  ): Promise<any> {
    const restaurants = await this.restaurantBizService.getRestaurantById(
      getRestaurantByIdParams,
      apiCode
    );
    if (restaurants.length === 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "Restaurant not found")
        .exception;
    }
    return new CommonResponse(null, 200, "OK", restaurants);
  }

  async deleteRestaurant(
    deleteRestaurantParams: DeleteRestaurantDto,
    apiCode: string
  ): Promise<any> {
    const { data } = await this.restaurantBizService.deleteRestaurant(
      deleteRestaurantParams,
      apiCode
    );
    return new CommonResponse(null, 204, "Deleted", data, true);
  }

  async updateAddressForRestaurant(
    updateAddressParams: UpdateAddressDto,
    apiCode: string
  ): Promise<any> {
    const { id } = updateAddressParams;
    const restaurant = await this.restaurantBizService.getRestaurantById(
      {
        id,
      },
      apiCode
    );
    if (restaurant.length === 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "Restaurant not found")
        .exception;
    }
    const { data } = await this.restaurantBizService.updateAddressForRestaurant(
      updateAddressParams,
      apiCode
    );
    return new CommonResponse(null, 200, "Updated", data, true);
  }
}

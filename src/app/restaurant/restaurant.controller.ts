import {
  ApiTags,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiSecurity,
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Query,
  Res,
  UseGuards,
  UsePipes,
  Param,
  Patch,
} from "@nestjs/common";

import { Response } from "express";
import { AuthGuardApiG } from "../../guards/apiGee/auth.ApiGee.guard";

import { any } from "@hapi/joi";

import { httpApiGeeCodes } from "../../http/apiGee/http.apiGeeCodes.enum";

import {
  commonBadRequest,
  commonCreated,
  commonForbidden,
  commonInternalServerError,
  commonNotAuthorized,
  commonNotFound,
  commonOK,
} from "../../swagger/apiDocumentationCommonResponse";
import AddRestaurantDto from "./dto/addRestaurants.dto";
import RestaurantService from "./restaurant.service";
import addRestaurantSchema from "./schema/addRestaurants.schema";
import deleteRestaurantSchema from "./schema/deleteRestaurants.schema";
import DeleteRestaurantDto from "./dto/deleteRestaurants.dto";
import GetRestaurantByIdDto from "./dto/getRestaurantById.dto";
import updateAddressSchema from "./schema/updateAddress.schema";
import UpdateAddressDto from "./dto/updateAddress.dto";
import { JoiValidationPipeApiG } from "src/pipes/apiGee/joiValidation.apiGee.pipe";
import getRestaurantByIdSchema from "./schema/getRestaurantById.schema";
import GetRestaurantByCoordinatesDto from "./dto/getRestaurantsByCoordinates.dto";
import GetRestaurantByNameDto from "./dto/getRestaurantByName.dto";
import getRestaurantByCoordinatesSchema from "./schema/getRestaurantsByCoordinates.schema";

const apiCode = httpApiGeeCodes["RestaurantController"];
@ApiTags("Restaurants")
@ApiSecurity("authorization")
@Controller("restaurants")
export default class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  /** addRestaurants- START */
  @Post("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully created restaurant",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(addRestaurantSchema, apiCode))
  async addRestaurant(
    @Body() addRestaurantParmas: AddRestaurantDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.restaurantService.addRestaurant(
      addRestaurantParmas,
      apiCode
    );
  }
  /** addRestaurants - END */

  /** getRestaurantsByCoordinates- START */
  @Get("/coordinates")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(
    commonNotFound({ apiCode, message: "Restaurants Not Found" })
  )
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived restaurants data",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(
    new JoiValidationPipeApiG(getRestaurantByCoordinatesSchema, apiCode)
  )
  async getRestaurantsByCoordinates(
    @Query() restaurantByCoordinatesParams: GetRestaurantByCoordinatesDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.restaurantService.getRestaurantsByCoordinates(
      restaurantByCoordinatesParams,
      apiCode
    );
  }
  /** getRestaurantsByCoordinates - END */

  /** getRestaurantsByCoordinates- START */
  @Get("/name")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(
    commonNotFound({ apiCode, message: "Restaurants Not Found" })
  )
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived restaurants data",
    })
  )
  @UseGuards(AuthGuardApiG)
  async getRestaurantsByName(
    @Query() restaurantByNameParams: GetRestaurantByNameDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.restaurantService.getRestaurantsByName(
      restaurantByNameParams,
      apiCode
    );
  }
  /** getRestaurantsByCoordinates - END */

  /** getRestaurants- START */
  @Get("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(
    commonNotFound({ apiCode, message: "Restaurants Not Found" })
  )
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived restaurants data",
    })
  )
  @UseGuards(AuthGuardApiG)
  async getRestaurants(@Res() _res: Response): Promise<any> {
    return await this.restaurantService.getRestaurants(apiCode);
  }
  /** getRestaurants - END */

  /** getRestaurantById- START */
  @Get("/:id")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(
    commonNotFound({ apiCode, message: "Restaurants Not Found" })
  )
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived restaurants data",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(getRestaurantByIdSchema, apiCode))
  async getRestaurantById(
    @Param() getRestaurantByIdParams: GetRestaurantByIdDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.restaurantService.getRestaurantById(
      getRestaurantByIdParams,
      apiCode
    );
  }
  /** getRestaurantById - END */

  /** deleteRestaurant- START */
  @Delete("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully deleted restaurant",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(deleteRestaurantSchema, apiCode))
  async deleteRestaurant(
    @Query() deleteRestaurantParams: DeleteRestaurantDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.restaurantService.deleteRestaurant(
      deleteRestaurantParams,
      apiCode
    );
  }
  /** deleteRestaurant - END */

  /** updateAddressForRestaurant- START */
  @Patch("/change-address")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully updated address for restaurant",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(updateAddressSchema, apiCode))
  async updateAddressForRestaurant(
    @Body() updateAddressParams: UpdateAddressDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.restaurantService.updateAddressForRestaurant(
      updateAddressParams,
      apiCode
    );
  }
  /** updateAddressForRestaurant - END */
}

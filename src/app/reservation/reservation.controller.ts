import {
  ApiTags,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiSecurity,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Query,
  Res,
  UseGuards,
  UsePipes,
  Patch,
} from "@nestjs/common";

import { Response } from "express";
import { AuthGuardApiG } from "../../guards/apiGee/auth.ApiGee.guard";

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
import ReservationService from "./reservation.service";
import addReservationSchema from "./schema/addReservation.schema";
import AddReservationDto from "./dto/addReservation.dto";
import GetReservationsDto from "./dto/getReservations.dto";
import deleteReservationSchema from "./schema/deleteReservation.schema";
import DeleteReservationDto from "./dto/deleteReservation.dto";
import UpdateReservationDto from "./dto/updateReservation.dto";
import updateReservationSchema from "./schema/updateReservation.schema";
import { JoiValidationPipeApiG } from "src/pipes/apiGee/joiValidation.apiGee.pipe";
import getReservationsSchema from "./schema/getReservations.schema";

const apiCode = httpApiGeeCodes["ReservationController"];
@ApiTags("Reservation")
@ApiSecurity("authorization")
@Controller("reservations")
export default class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /** addReservation - START */
  @Post("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully added reservation",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(addReservationSchema, apiCode))
  async addReservation(
    @Body() addReservationParams: AddReservationDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.reservationService.addReservation(
      addReservationParams,
      apiCode
    );
  }
  /** addReservation - END */

  /** getReservationsPerUser - START */
  @Get("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "Menu Not Found" }))
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived reservations data",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(getReservationsSchema, apiCode))
  async getReservationsPerUser(
    @Query() getReservationsParams: GetReservationsDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.reservationService.getReservationsPerUser(
      getReservationsParams,
      apiCode
    );
  }
  /** getReservationsPerUser - END */

  /** deleteReservation - START */
  @Delete("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully deleted reservation",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(deleteReservationSchema, apiCode))
  async deleteReservation(
    @Body() deleteReservationParams: DeleteReservationDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.reservationService.deleteReservation(
      deleteReservationParams,
      apiCode
    );
  }
  /** deleteTable - END */

  /** updateReservation - START */
  @Patch("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully update time of reservation",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(updateReservationSchema, apiCode))
  async updateReservation(
    @Body() updateReservationParams: UpdateReservationDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.reservationService.updateReservation(
      updateReservationParams,
      apiCode
    );
  }
  /** updateReservation - END */
}

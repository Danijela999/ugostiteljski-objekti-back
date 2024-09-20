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
  commonForbidden,
  commonInternalServerError,
  commonNotAuthorized,
  commonNotFound,
  commonOK,
} from "../../swagger/apiDocumentationCommonResponse";
import PositionService from "./position.service";
import { JoiValidationPipeApiG } from "src/pipes/apiGee/joiValidation.apiGee.pipe";
import getPositionsByRestaurantSchema from "./schema/positionsByRestaurant.schema";
import GetPositionsByRestaurantDto from "./dto/positionsByRestaurant.dto";

const apiCode = httpApiGeeCodes["PositionController"];
@ApiTags("Position")
@ApiSecurity("authorization")
@Controller("positions")
export default class PositionController {
  constructor(private readonly positionService: PositionService) {}

  /** getPositions - START */
  @Get("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(
    commonNotFound({ apiCode, message: "Positions Not Found" })
  )
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived positions data",
    })
  )
  @UseGuards(AuthGuardApiG)
  async getPositions(@Res() _res: Response): Promise<any> {
    return await this.positionService.getPositions(apiCode);
  }
  /** getPositions - END */

  /** getPositionsByRestaurant - START */
  @Get("/restaurant")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(
    commonNotFound({ apiCode, message: "Positions Not Found" })
  )
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived positions data",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(getPositionsByRestaurantSchema, apiCode))
  async getPositionsByRestaurant(
    @Query() params: GetPositionsByRestaurantDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.positionService.getPositionsByRestaurant(params, apiCode);
  }
  /** getPositionsByRestaurant - END */
}

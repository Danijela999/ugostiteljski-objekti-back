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
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "Menu Not Found" }))
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived categories data",
    })
  )
  @UseGuards(AuthGuardApiG)
  async getPositions(@Res() _res: Response): Promise<any> {
    return await this.positionService.getPositions(apiCode);
  }
  /** getPositions - END */
}

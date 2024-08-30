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
import CategoryService from "./category.service";

const apiCode = httpApiGeeCodes["CategoryController"];
@ApiTags("Category")
@ApiSecurity("authorization")
@Controller("categories")
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /** getCategories - START */
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
  async getCategories(@Res() _res: Response): Promise<any> {
    return await this.categoryService.getCategories(apiCode);
  }
  /** getCategories - END */
}

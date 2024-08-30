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
import { JoiValidationPipe } from "src/pipes/joiValidation.pipe";
import addTableSchema from "./schema/addTable.schema";
import AddTableDto from "./dto/addTable.dto";
import GetTablesDto from "./dto/getTables.dto";
import DeleteTableDto from "./dto/deleteTable.dto";
import deleteTableSchema from "./schema/deleteTable.schema";
import TableService from "./table.service";
import UpdateChairsDto from "./dto/updateChairs.dto";
import updateChairsSchema from "./schema/updateChairs.schema";
import { JoiValidationPipeApiG } from "src/pipes/apiGee/joiValidation.apiGee.pipe";
import getTablesSchema from "./schema/getTables.schema";

const apiCode = httpApiGeeCodes["TableController"];
@ApiTags("Table")
@ApiSecurity("authorization")
@Controller("tables")
export default class TableController {
  constructor(private readonly tableService: TableService) {}

  /** addTable - START */
  @Post("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully added table",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(addTableSchema, apiCode))
  async addTable(
    @Body() addTableParams: AddTableDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.tableService.addTable(addTableParams, apiCode);
  }
  /** addTable - END */

  /** getTablesPerRestaurant - START */
  @Get("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "Table Not Found" }))
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived tables data",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(getTablesSchema, apiCode))
  async getTablesPerRestaurant(
    @Query() getTablesParams: GetTablesDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.tableService.getTablesPerRestaurant(
      getTablesParams,
      apiCode
    );
  }
  /** getTablesPerRestaurant - END */

  /** deleteTable - START */
  @Delete("/")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully deleted table",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(deleteTableSchema, apiCode))
  async deleteTable(
    @Query() deleteTableParams: DeleteTableDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.tableService.deleteTable(deleteTableParams, apiCode);
  }
  /** deleteTable - END */

  /** updateChairs - START */
  @Patch("/change-chairs")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "Table Not Found" }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully Update Chairs",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(updateChairsSchema, apiCode))
  async updateChairs(
    @Body() updateChairsParams: UpdateChairsDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.tableService.updateChairs(updateChairsParams, apiCode);
  }
  /** updateChairs - END */
}

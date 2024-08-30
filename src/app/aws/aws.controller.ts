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
    Post,
    Res,
    UseGuards,
    UploadedFile,
    UseInterceptors,
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
  import AwsService from "./aws.service";
  import { FileInterceptor } from "@nestjs/platform-express";
  
  const apiCode = httpApiGeeCodes["ImagesController"];
  @ApiTags("Images")
  @ApiSecurity("authorization")
  @Controller("images")
  export default class AwsController {
    constructor(private readonly awsService: AwsService) {}
    /** addImages- START */
    @Post("/")
    @ApiBadRequestResponse(commonBadRequest({ apiCode }))
    @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
    @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
    @ApiForbiddenResponse(commonForbidden({ apiCode }))
    @ApiNotFoundResponse(commonNotFound({ apiCode, message: "Images Not Found" }))
    @ApiOkResponse(
      commonOK({
        description: "Successfully inserted images data",
      })
    )
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(AuthGuardApiG)
    async addImages(
      @UploadedFile('file') file: Express.Multer.File,
      @Res() _res: Response
    ): Promise<any> {
      console.log(file);
      return await this.awsService.addImages(file, apiCode);
    }
    /** addImages - END */
  }
  
  
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
  Post,
  Put,
  Body,
  Res,
  UsePipes,
  Patch,
  UseGuards,
  Delete,
  Param,
  Get,
} from "@nestjs/common";

import { Response } from "express";
import {
  commonBadRequest,
  commonCreated,
  commonForbidden,
  commonInternalServerError,
  commonNotAuthorized,
  commonNotFound,
  commonOK,
} from "../../swagger/apiDocumentationCommonResponse";
import CreateUserDto from "./dto/createUser.dto";
import UserService from "./user.service";
import { JoiValidationPipe } from "src/pipes/joiValidation.pipe";
import createUserSchema from "./schema/createUser.schema";
import loginUserSchema from "./schema/loginUser.schema";
import LoginUserDto from "./dto/loginUser.dto";
import refreshSchema from "./schema/refreshToken.schema";
import RefreshTokenDto from "./dto/refreshToken.dto";
import changePasswordSchema from "./schema/changePassword.schema";
import ChangePasswordDto from "./dto/changePassword.dto";
import { AuthGuardApiG } from "src/guards/apiGee/auth.ApiGee.guard";
import { httpApiGeeCodes } from "src/http/apiGee/http.apiGeeCodes.enum";
import { JoiValidationPipeApiG } from "src/pipes/apiGee/joiValidation.apiGee.pipe";
import LogoutDto from "./dto/logout.dto";
import logoutSchema from "./schema/logout.schema";
import forgotPasswordSchema from "./schema/forgotPassword.schema";
import ForgotPasswordDto from "./dto/forgotPassword.dto";
import changeProfilePhotoSchema from "./schema/changeProfilePhoto.schema";
import ChangeProfilePhotoDto from "./dto/changeProfilePhoto.dto";
import getUserByEmailSchema from "./schema/getUserByEmail.schema";
import GetUserByEmailDto from "./dto/getUserByEmail.dto";

const apiCode = httpApiGeeCodes["UserController"];
@ApiTags("User")
@Controller("users")
export default class UserController {
  constructor(private readonly userService: UserService) {}

  /** createUser- START */
  @Post("/create")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully created user",
    })
  )
  @UsePipes(new JoiValidationPipeApiG(createUserSchema, apiCode))
  async createUser(
    @Body() createUserParams: CreateUserDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.userService.createUser(createUserParams, apiCode);
  }
  /** createUser - END */

  /** loginUser- START */
  @Post("/login")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "User Not Found" }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully login user",
    })
  )
  @UsePipes(new JoiValidationPipe(loginUserSchema))
  async loginUser(
    @Body() loginUserParams: LoginUserDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.userService.loginUser(loginUserParams, apiCode);
  }
  /** loginUser - END */

  /** refreshToken- START */
  @Post("/refresh")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "User Not Found" }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully refresh token",
    })
  )
  @UsePipes(new JoiValidationPipeApiG(refreshSchema, apiCode))
  async refreshToken(
    @Body() refreshTokenParams: RefreshTokenDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.userService.refreshToken(refreshTokenParams, apiCode);
  }
  /** refreshToken - END */

  /** changePassword- START */
  @Patch("/change-password")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "User Not Found" }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully changed password",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(changePasswordSchema, apiCode))
  async changePassword(
    @Body() changePasswordParams: ChangePasswordDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.userService.changePassword(changePasswordParams, apiCode);
  }
  /** changePassword - END */

  /** forgotPassword- START */
  @Post("/forgot-password")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "User Not Found" }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully forgot password",
    })
  )
  @UsePipes(new JoiValidationPipeApiG(forgotPasswordSchema, apiCode))
  async forgotPassword(
    @Body() forgotPasswordParams: ForgotPasswordDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.userService.forgotPassword(forgotPasswordParams, apiCode);
  }
  /** forgotPassword - END */

  /** logout- START */
  @Delete("/logout")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(commonNotFound({ apiCode, message: "User Not Found" }))
  @ApiOkResponse(
    commonCreated({
      description: "Successfully logout",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(logoutSchema, apiCode))
  async logout(
    @Body() logoutParams: LogoutDto,
    @Res() _res: Response
  ): Promise<any> {
    return await this.userService.logout(logoutParams, apiCode);
  }
  /** logout - END */
   /** changePhoto- START */
   @Patch("/change-profile-photo")
   @ApiBadRequestResponse(commonBadRequest({ apiCode }))
   @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
   @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
   @ApiForbiddenResponse(commonForbidden({ apiCode }))
   @ApiNotFoundResponse(commonNotFound({ apiCode, message: "User Not Found" }))
   @ApiOkResponse(
     commonCreated({
       description: "Successfully changed profile photo",
     })
   )
   @UseGuards(AuthGuardApiG)
   @UsePipes(new JoiValidationPipeApiG(changeProfilePhotoSchema, apiCode))
   async changeProfilePhoto(
     @Body() changePhotoParams: ChangeProfilePhotoDto,
     @Res() _res: Response
   ): Promise<any> {
     return await this.userService.changeProfilePhoto(changePhotoParams, apiCode);
   }
   /** changePhoto - END */

   /** getUserByEmail- START */
  @Get("/:email")
  @ApiBadRequestResponse(commonBadRequest({ apiCode }))
  @ApiInternalServerErrorResponse(commonInternalServerError({ apiCode }))
  @ApiUnauthorizedResponse(commonNotAuthorized({ apiCode }))
  @ApiForbiddenResponse(commonForbidden({ apiCode }))
  @ApiNotFoundResponse(
    commonNotFound({ apiCode, message: "User not found" })
  )
  @ApiOkResponse(
    commonOK({
      description: "Successfully retreived user data",
    })
  )
  @UseGuards(AuthGuardApiG)
  @UsePipes(new JoiValidationPipeApiG(getUserByEmailSchema, apiCode))
  async getRestaurantById(
    @Param() email: GetUserByEmailDto,
    @Res() _res: Response
  ): Promise<any> {
    console.log("Emailll", email);
    return await this.userService.getUserByEmail(email.email, apiCode);
  }
  /**  getUserByEmail - END */
}

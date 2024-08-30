import {
  HttpStatus,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
  ExecutionContext,
  RequestTimeoutException
} from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CommonExceptionApiGee {
  @ApiProperty({ required: true, example: "500.001.001" })
  code: number | string;
  @ApiProperty({ required: true, example: "Internal Server Error" })
  message: string;
  @ApiProperty({ required: false, example: "Data isn't saved to db" })
  description: string;
  @ApiProperty({ required: false, example: "Db connection is closed" })
  error: any;
  @ApiProperty({ required: false, example: "{}" })
  data: any;

  constructor(
    code: number | string,
    message: string,
    description?: string,
    error?: any,
    data?: any
  ) {
    this.code = code;
    this.message = message;
    if (description !== undefined && description !== null) {
      this.description = description;
    }
    if (error && error !== undefined && error !== null) {
      this.error = error;
    }
    if (data !== undefined && data !== null) {
      this.data = data;
    }
  }

  createCustomException() {
    var code = Number(String(this.code).slice(0, 3));
    switch (code) {
      case HttpStatus.FORBIDDEN:
        return new ForbiddenException(this);
      case HttpStatus.BAD_REQUEST:
        return new BadRequestException(this);
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return new InternalServerErrorException(this);
      case HttpStatus.NOT_FOUND:
        return new NotFoundException(this);
      case HttpStatus.UNAUTHORIZED:
        return new UnauthorizedException(this);
      case HttpStatus.REQUEST_TIMEOUT:
        return new RequestTimeoutException(this);
      default:
        return new InternalServerErrorException(this);
    }
  }
}

export class CustomForbiddenExceptionApiG {
  exception: ForbiddenException;

  constructor(
    apiCode: string,
    message?: string,
    description?: string,
    errorCode?: string,
    error?: any,
    data?: any
  ) {
    let common = new CommonExceptionApiGee(
      `${HttpStatus.FORBIDDEN}.${apiCode}.${errorCode ? errorCode : "003"}`,
      message ? message : "Forbidden",
      description,
      error,
      data
    );
    this.exception = new ForbiddenException(common);
  }
}

export class CustomBadRequestExceptionApiG {
  exception: BadRequestException;
  context: ExecutionContext;
  constructor(
    apiCode: string,
    message?: string,
    description?: string,
    errorCode?: string,
    error?: any,
    data?: any
  ) {
    let common = new CommonExceptionApiGee(
      `${HttpStatus.BAD_REQUEST}.${apiCode}.${errorCode ? errorCode : "010"}`,
      message ? message : "Bad Request",
      description,
      error,
      data
    );
    this.exception = new BadRequestException(common);
  }
}

export class CustomInternalServerErrorExceptionApiG {
  exception: InternalServerErrorException;

  constructor(
    apiCode: string,
    message?: string,
    description?: string,
    errorCode?: string,
    error?: any,
    data?: any
  ) {
    let common = new CommonExceptionApiGee(
      `${HttpStatus.INTERNAL_SERVER_ERROR}.${apiCode}.${
        errorCode ? errorCode : "000"
      }`,
      message ? message : "Internal Server Error",
      description,
      error,
      data
    );
    this.exception = new InternalServerErrorException(common);
  }
}

export class CustomNotFoundExceptionApiG {
  exception: NotFoundException;

  constructor(
    apiCode: string,
    message?: string,
    description?: string,
    errorCode?: string,
    error?: any,
    data?: any
  ) {
    let common = new CommonExceptionApiGee(
      `${HttpStatus.NOT_FOUND}.${apiCode}.${errorCode ? errorCode : "004"}`,
      message ? message : "Not Found",
      description,
      error,
      data
    );
    this.exception = new NotFoundException(common);
  }
}

export class CustomUnauthorizedExceptionApiG {
  exception: UnauthorizedException;

  constructor(
    apiCode: string,
    message?: string,
    description?: string,
    errorCode?: string,
    error?: any,
    data?: any
  ) {
    let common = new CommonExceptionApiGee(
      `${HttpStatus.UNAUTHORIZED}.${apiCode}.${errorCode ? errorCode : "001"}`,
      message,
      description,
      error,
      data
    );
    this.exception = new UnauthorizedException(common);
  }
}

export class CustomMethodNotAllowedExceptionApiG {
  exception: MethodNotAllowedException;

  constructor(
    apiCode: string,
    message?: string,
    description?: string,
    errorCode?: string,
    error?: any,
    data?: any
  ) {
    let common = new CommonExceptionApiGee(
      `${HttpStatus.METHOD_NOT_ALLOWED}.${apiCode}.${
        errorCode ? errorCode : "005"
      }`,
      message ? message : "Method Not Allowed",
      description,
      error,
      data
    );
    this.exception = new MethodNotAllowedException(common);
  }
}

export class CustomTimeoutExceptionApiG {
  exception: RequestTimeoutException;
  constructor(
    apiCode: string,
    message?: string,
    description?: string,
    errorCode?: string,
    error?: any,
    data?: any
  ) {
    let common = new CommonExceptionApiGee(
      `${HttpStatus.REQUEST_TIMEOUT}.${apiCode}.${
        errorCode ? errorCode : "008"
      }`,
      message,
      description,
      error,
      data
    );
    this.exception = new RequestTimeoutException(common);
  }
}

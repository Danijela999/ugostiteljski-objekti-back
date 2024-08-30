import {
  HttpStatus,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  RequestTimeoutException
} from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CommonException {
  @ApiProperty({ required: true, example: 500 })
  code: number;
  @ApiProperty({ required: true, example: "Internal Server Error" })
  message: string;
  @ApiProperty({ required: false, example: "Data isn't saved to db" })
  description: string;
  @ApiProperty({ required: false, example: "Db connection is closed" })
  error: any;
  @ApiProperty({ required: false, example: "{}" })
  data: any;

  constructor(
    code: number,
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
    if (error) {
      this.error = error;
    }
    if (data !== undefined) {
      this.data = data;
    }
  }

  createCustomException() {//bespotrebno napravljena?
    switch (this.code) {
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
export class CustomForbiddenException {
  exception: ForbiddenException;

  constructor(message: string, description?: string, error?: any, data?: any) {
    let common = new CommonException(
      HttpStatus.FORBIDDEN,
      message,
      description,
      error,
      data
    );
    this.exception = new ForbiddenException(common);
  }
}

export class CustomBadRequestException {
  exception: BadRequestException;

  constructor(message: string, description?: string, error?: any, data?: any) {
    let common = new CommonException(
      HttpStatus.BAD_REQUEST,
      message,
      description,
      error,
      data
    );
    this.exception = new BadRequestException(common);
  }
}

export class CustomInternalServerErrorException {
  exception: InternalServerErrorException;

  constructor(message: string, description?: string, error?: any, data?: any) {
    let common = new CommonException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      description,
      error,
      data
    );
    this.exception = new InternalServerErrorException(common);
  }
}

export class CustomNotFoundException {
  exception: NotFoundException;

  constructor(message: string, description?: string, error?: any, data?: any) {
    let common = new CommonException(
      HttpStatus.NOT_FOUND,
      message,
      description,
      error,
      data
    );
    this.exception = new NotFoundException(common);
  }
}

export class CustomUnauthorizedException {
  exception: UnauthorizedException;

  constructor(message: string, description?: string, error?: any, data?: any) {
    let common = new CommonException(
      HttpStatus.UNAUTHORIZED,
      message,
      description,
      error,
      data
    );
    this.exception = new UnauthorizedException(common);
  }
}

export class CustomTimeoutException {
  exception: RequestTimeoutException;

  constructor(message: string, description?: string, error?: any, data?: any) {
    let common = new CommonException(
      HttpStatus.REQUEST_TIMEOUT,
      message,
      description,
      error,
      data
    );
    this.exception = new RequestTimeoutException(common);
  }
}

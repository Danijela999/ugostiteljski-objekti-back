import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import {
  CustomNotFoundException,
  CommonException,
} from "../http/http.exception";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  static fileName: string = __filename;
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let data;
    let status;
    let requestInfo = {};
    let reqDate = new Date();
    if (exception.reqDate) {
      reqDate = exception.reqDate;
      requestInfo = exception.requestInfo;
      exception = exception.error;
    }
    try {
      const exceptionResponse = exception.getResponse();
      status = exception.getStatus();
      if (exceptionResponse.error === "Not Found") {
        // Path doesn't exists
        data = new CustomNotFoundException(
          "Not Found",
          exceptionResponse.message
        ).exception.getResponse();
      }
      // path does exist, but "not found" exception has been thrown from the code
      else {
        console.log(exception.toString());
        data = exceptionResponse;
      }
    } catch (error) {
      console.log(exception.toString());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      data = new CommonException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Unhandled error",
        exception.stack,
        exception.message
      );
    }
    try {
      // so we can monitor response bodies of requests that resulted in an error
    } catch (error) {
      console.log("error just before sending response:");
      console.log(error);
    } finally {
      response.status(status).json(data);
    }
  }
}

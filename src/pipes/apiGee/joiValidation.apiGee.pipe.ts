import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import Joi = require("@hapi/joi");
import { Response } from "express";
import { CustomBadRequestExceptionApiG } from "../../http/apiGee/http.apiGee.exception";

@Injectable()
export class JoiValidationPipeApiG implements PipeTransform {
  apiCode: string;
  constructor(private readonly schema: Joi.ObjectSchema, apiCode: string) {
    this.apiCode = apiCode;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    /**
     * Iz query parametara brisemo ts parametar,
     * jer je on dodat u GET metode na react-u - kako bi se izbeglo cache-iranje na Internet Explorer
     * napomena: razmisljano da se naziv parametara koji se brisu stavi u .env,
     * ali da bismo bili sigurni da se ISTI parametri brisu na svim instancama aplikacije
     * odluceno je da ostane u kodu
     */

    if (metadata.type === "query" && value.ts) delete value.ts;
    if (
      metadata.type === "query" ||
      metadata.type === "body" ||
      metadata.type === "param"
    ) {
      const { error } = this.schema.validate(value);
      if (error) {
        let res: Response;
        throw new CustomBadRequestExceptionApiG(
          this.apiCode,
          "Bad Request - Request validation failed: " + error
        ).exception;
      }
    }

    return value;
  }
}

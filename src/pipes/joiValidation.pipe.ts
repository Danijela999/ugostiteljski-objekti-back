import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import Joi = require("@hapi/joi");
import { Response } from "express";
import { CustomBadRequestException } from "../http/http.exception";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    /**
     * Iz query parametara brisemo ts parametar,
     * jer je on dodat u GET metode na react-u - kako bi se izbeglo cache-iranje na Internet Explorer
     * napomena: razmisljano da se naziv parametara koji se brisu stavi u .env,
     * ali da bismo bili sigurni da se ISTI parametri brisu na svim instancama aplikacije
     * odluceno je da ostane u kodu
     */
    if (metadata.type === "query" && value.ts) delete value.ts;

    const { error } = this.schema.validate(value);
    if (error) {
      let res: Response;
      throw new CustomBadRequestException("Request validation failed: " + error)
        .exception;
    }
    return value;
  }
}

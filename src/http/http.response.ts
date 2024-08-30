import { ApiProperty } from "@nestjs/swagger";

export class CommonResponse {
  @ApiProperty({ required: true, example: 200 })
  code: number = 200;
  @ApiProperty({ required: true, example: "OK" })
  message: string = "OK";
  @ApiProperty({ required: false, example: "Time is succesffuly Updated" })
  description: string;
  @ApiProperty({ required: false, example: {} })
  data: object | string = {};
  @ApiProperty({
    required: false,
    example: { "Content-Type": "application/pdf" },
    description: "For initializing response headers, doesn't go to response"
  })
  headers: object = {};
  @ApiProperty({
    required: false,
    description:
      "When we want to return exact data, not predefined CommonResponse object"
  })
  raw: boolean;

  constructor(
    description?: string,
    code?: number,
    message?: string,
    data?: object | string,
    noData?: boolean,
    headers?: object,
    raw?: boolean
  ) {
    if (code !== undefined && code !== null) {
      this.code = code;
    }
    if (message !== undefined && message !== null) {
      this.message = message;
    }
    if (description !== undefined && description !== null) {
      this.description = description;
    }
    if (noData) {
      // only if noData === true data param will be ommited in response
      delete this.data;
    } else {
      if (data !== undefined && data !== null) {
        this.data = data;
      }
    }
    if (headers !== undefined && headers !== null) {
      this.headers = headers;
    }
    if (raw) {
      this.raw = raw;
    }
  }
}

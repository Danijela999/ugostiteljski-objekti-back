import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import AwsBizService from "src/bizServices/aws/aws.service";

@Injectable()
export default class AwsService {
  constructor(private readonly imagesBizService: AwsBizService) {}
  async addImages(file: Express.Multer.File, apiCode: string): Promise<any> {
    try {
      const data = await this.imagesBizService.addImages(
        file,
        "storez",
        apiCode
      );
      return new CommonResponse(null, 200, "OK", data);
    } catch (err) {}
  }
}

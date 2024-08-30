import { Injectable } from "@nestjs/common";
import AwsClient from "src/biz/aws/aws.client";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export default class AwsBizService {
  constructor(private readonly awsClient: AwsClient) {}
  async addImages(
    file: Express.Multer.File,
    bucket: string,
    apiCode: string
  ): Promise<any> {
    try {
      const ress=await this.awsClient.addImages(file, bucket);
      console.log('RESSSSSSSSSSSS'||ress||'RESSSSSSSS');
      return ress;
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}

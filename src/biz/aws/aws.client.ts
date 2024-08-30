import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export default class AwsClient {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: "v4",
    });
  }

  async addImages(file: Express.Multer.File, bucket: string): Promise<any> {
    try {
      console.log(file);
      const { originalname, buffer, mimetype } = file;

      const uploadParams = {
        Bucket: bucket,
        Key: originalname, // Ime fajla u bucketu
        Body: buffer, // Sadržaj fajla
        ContentType: mimetype,
        // ACL: "public-read", // Opcionalno, ako želite da fajl bude javno dostupan
      };
      return await this.s3.upload(uploadParams).promise();
    } catch (err) {
      console.error("Error fetching objects", err);
      throw err;
    }
  }
}

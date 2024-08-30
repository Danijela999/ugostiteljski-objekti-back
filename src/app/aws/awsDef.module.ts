import { Module } from "@nestjs/common";
import AwsClient from "src/biz/aws/aws.client";

@Module({
  providers: [AwsClient],
  exports: [AwsClient],
})
export class AwsDefModule {}

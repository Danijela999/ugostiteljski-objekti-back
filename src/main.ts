import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AppConfigService } from "./config/configuration.service";
import { AllExceptionsFilter } from "./filters/allExceptions.filter";
import MySQLBuilder from "./biz/mysql/builder/mysqlBuilder";
import { HostGuard } from "./guards/host.guard";
import { json } from "express";

process.env.UV_THREADPOOL_SIZE = "10";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.use(json({ limit: "50mb" }));
  const appConfig: AppConfigService = app.get("AppConfigService");
  const mysqlDbBuilder: MySQLBuilder = app.get("MySQLBuilder");

  app.enableCors();

  const options = new DocumentBuilder()
    .addSecurity("authorization", {
      type: "apiKey",
      in: "header",
      name: "authorization",
    })
    .setTitle("Catering Facilities")
    .setDescription("Documentation for every API from Catering Facilities")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalGuards(new HostGuard(appConfig));
  app.useGlobalFilters(new AllExceptionsFilter());

  try {
    await Promise.all([mysqlDbBuilder.createMySQLClients()]);
  } catch (error) {
    console.log(
      "Application will not start due to error while connecting to external services"
    );
    throw error;
  }
  await app.listen(appConfig.appPort);
  console.log("App listens on " + appConfig.appPort);
}
bootstrap();

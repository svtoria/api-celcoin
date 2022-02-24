import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import * as fs from "fs";

async function bootstrap() {
  dotenv.config();

  const httpsOptions = {
    key: fs.readFileSync("./secrets/server.key"),
    cert: fs.readFileSync("./secrets/server.cert"),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Celcoin API")
    .setDescription("Camada de conexão com a Api da Celcoin")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8457);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

const httpsOptions: HttpsOptions = {
  key: fs.readFileSync('./secrets/key.pem'),
  cert: fs.readFileSync('./secrets/cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();

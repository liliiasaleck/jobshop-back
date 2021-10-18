import {  Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config, ConfigService } from 'aws-sdk';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './transform.interceptors';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT;
  await app.listen(port || 3000);
  logger.log(`Application listening on port ${port}`);

}
bootstrap();

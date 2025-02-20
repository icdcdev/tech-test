import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import { configure } from '@codegenie/serverless-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';

let server: Handler; //Lambda server instance

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prefix = configService.get<string>('STAGE', 'dev');

  // Swagger API Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Cloud Swagger Documentation')
    .setDescription('Documentation for Cloud Swagger')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      in: 'header',
      name: 'api-key',
    })
    .addServer(`/${prefix}`)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      displayRequestDuration: true,
    },
  });

  SwaggerModule.setup('documentation', app, documentFactory);

  app.use(new ApiKeyMiddleware().use);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Ensures proper transformation of types, e.g., string to Date
      whitelist: true, // Removes any extra properties from the request body that are not part of the DTO
    }),
  );

  await app.init(); // Initialize the NestJS application

  // Get the underlying Express app instance from the NestJS HTTP adapter
  const expressHandler = app.getHttpAdapter().getInstance();

  // Configure serverless-express with the Express app instance
  return configure({ app: expressHandler });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return await server(event, context, callback);
};

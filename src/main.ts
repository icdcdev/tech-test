import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import { configure } from '@codegenie/serverless-express';

let server: Handler; //Lambda server instance

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

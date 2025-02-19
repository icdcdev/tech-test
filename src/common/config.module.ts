import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

export const environment_variable: string = '.env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: environment_variable,
      isGlobal: true,
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}

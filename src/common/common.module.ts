import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres.module';

@Module({
  imports: [ConfigModule, PostgresModule],
  exports: [ConfigModule, PostgresModule],
})
export class CommonModule {}

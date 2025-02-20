import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ClientsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

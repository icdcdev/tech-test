import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CommonModule } from './common/common.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [ClientsModule, CommonModule, VehiclesModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

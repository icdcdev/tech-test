import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    ClientsModule,
    VehiclesModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}

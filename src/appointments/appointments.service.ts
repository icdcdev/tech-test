import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import { ClientsService } from 'src/clients/clients.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { AppointmentStatus } from 'src/enums/status.enums';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiResponseDto } from 'src/helpers/api_response.helper';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private readonly clientsService: ClientsService,
    private readonly vehiclesService: VehiclesService,
  ) {}
  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<ApiResponseDto<Appointment>> {
    const { clientId, vehicleId, date, time } = createAppointmentDto;

    const client = await this.clientsService.findOne(clientId);
    const vehicle = await this.vehiclesService.findOne(vehicleId);

    if (!client || !vehicle) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Client or vehicle not found.',
        data: null,
      };
    }

    if (!client.timezone) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Client timezone not found.',
        data: null,
      };
    }

    const appointmentDateTime = new Date(
      new Date(`${date}T${time}:00`).toLocaleString('en-US', {
        timeZone: client.timezone,
      }),
    );

    const appointmentDateTimeUTC = new Date(appointmentDateTime.toISOString());

    const existingAppointment = await this.appointmentsRepository.findOne({
      where: {
        date: appointmentDateTimeUTC.toISOString(),
        time,
      },
      relations: ['vehicle'],
    });

    if (
      existingAppointment &&
      existingAppointment.vehicle.vin === vehicle.vin &&
      existingAppointment.status === AppointmentStatus.ENABLED
    ) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `This vehicle already has an enabled appointment at this time.`,
        data: null,
      };
    }

    const appointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      client,
      vehicle,
      date: appointmentDateTimeUTC.toISOString(),
    });

    await this.appointmentsRepository.save(appointment);

    return {
      statusCode: HttpStatus.OK,
      message: 'Appointment successfully created.',
      data: appointment,
    };
  }

  async updateAppointmentDate(
    appointmentId: number,
    updateDateDto: { date: string; time: string },
  ): Promise<ApiResponseDto<Appointment>> {
    const { date, time } = updateDateDto;

    const appointment = await this.appointmentsRepository.findOne({
      where: { id: appointmentId },
      relations: ['vehicle'],
    });

    if (!appointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Appointment not found.',
        data: null,
      };
    }

    const existingAppointment = await this.appointmentsRepository.findOne({
      where: {
        date: new Date(`${date}T${time}:00`).toISOString().split('T')[0],
        time,
      },
      relations: ['vehicle'],
    });

    if (
      existingAppointment &&
      existingAppointment.vehicle.vin === appointment.vehicle.vin
    ) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `This vehicle already has an appointment at the selected time.`,
        data: null,
      };
    }

    appointment.date = new Date(`${date}T${time}:00`).toUTCString();
    appointment.updatedAt = new Date();

    await this.appointmentsRepository.save(appointment);

    return {
      statusCode: HttpStatus.OK,
      message: 'Appointment date updated successfully.',
      data: appointment,
    };
  }

  async cancelAppointment(
    appointmentId: number,
  ): Promise<ApiResponseDto<Appointment>> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Appointment not found.',
        data: null,
      };
    }

    appointment.status = AppointmentStatus.DISABLED;
    appointment.updatedAt = new Date();

    await this.appointmentsRepository.save(appointment);

    return {
      statusCode: HttpStatus.OK,
      message: 'Appointment successfully cancelled.',
      data: appointment,
    };
  }

  async getAppointmentsByDate(
    date: string,
  ): Promise<ApiResponseDto<Appointment[]>> {
    const startOfDayUTC = new Date(`${date}T00:00:00Z`);
    const endOfDayUTC = new Date(`${date}T23:59:59Z`);

    const appointments = await this.appointmentsRepository.find({
      where: {
        date: Between(startOfDayUTC.toISOString(), endOfDayUTC.toISOString()),
      },
      relations: ['client', 'vehicle'],
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Appointments retrieved successfully.',
      data: appointments,
    };
  }
}

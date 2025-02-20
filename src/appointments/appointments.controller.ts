import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { ApiAppoimentDecorator } from 'src/decorators/create.decorator';
import { ApiResponseDtoCreateAppoinment } from './dto/swagger/response-create-swagger.dto';
import { Appointment } from './entities/appointment.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Response } from 'express';
import { ApiResponseDto } from 'src/helpers/api_response.helper';

@ApiTags('Appointment')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  /**
   * @summary Create an appointment
   *
   * @description Creates a new appointment based on the provided data.
   *
   * @bodyParam {CreateAppointmentDto} createAppointmentDto - The data required to create the appointment.
   *
   * @response 200 - Appointment successfully created.
   * @response 400 - Error creating appointment.
   *
   * @param {CreateAppointmentDto} createAppointmentDto - The data for creating an appointment.
   * @param {Response} res - The response object.
   * @returns {Promise<ApiResponseDto>} The response object with the appointment data.
   */
  @ApiAppoimentDecorator({
    summary: { summary: 'Create Appointment' },
    errorObject: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Error to create appointment',
    },
    responseObject: {
      status: HttpStatus.OK,
      description: '',
      type: ApiResponseDtoCreateAppoinment,
    },
    body: {
      type: Appointment,
      description: 'The appointment data to be created.',
    },
  })
  @ApiBearerAuth()
  @Post('/create-appointment')
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Res() res: Response,
  ) {
    const appoiment =
      await this.appointmentsService.createAppointment(createAppointmentDto);
    return res.status(appoiment.statusCode).json(appoiment);
  }

  /**
   * @summary Update an appointment's date
   *
   * @description Updates the date and time of an existing appointment.
   *
   * @param {number} appointmentId - The ID of the appointment to be updated.
   * @param {Object} updateDateDto - The new date and time for the appointment.
   *
   * @response 200 - Appointment date successfully updated.
   * @response 400 - Error updating appointment date.
   *
   * @returns {Promise<ApiResponseDto>} The updated appointment.
   */
  @ApiAppoimentDecorator({
    summary: { summary: 'Update Appointment date' },
    errorObject: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Error to create appointment',
    },
    responseObject: {
      status: HttpStatus.OK,
      description: '',
      type: ApiResponseDtoCreateAppoinment,
    },
    body: {
      type: Appointment,
      description: 'The appointment data to be created.',
    },
  })
  @ApiBearerAuth()
  @Put(':id/date')
  async updateAppointmentDate(
    @Param('id') appointmentId: number,
    @Body() updateDateDto: { date: string; time: string },
  ): Promise<ApiResponseDto<Appointment>> {
    return this.appointmentsService.updateAppointmentDate(
      appointmentId,
      updateDateDto,
    );
  }

  /**
   * @summary Cancel an appointment
   *
   * @description Changes the status of an appointment to "DISABLED" and updates the appointment date.
   *
   * @param {number} appointmentId - The ID of the appointment to be canceled.
   *
   * @response 200 - Appointment successfully canceled.
   * @response 400 - Error canceling appointment.
   *
   * @returns {Promise<ApiResponseDto>} The canceled appointment.
   */
  @ApiBearerAuth()
  @Patch(':id/cancel')
  async cancelAppointment(
    @Param('id') appointmentId: number,
  ): Promise<ApiResponseDto<Appointment>> {
    return this.appointmentsService.cancelAppointment(appointmentId);
  }

  /**
   * @summary Get appointments by date
   *
   * @description Retrieves all appointments for a specific date.
   *
   * @param {string} date - The date to search for appointments (in format YYYY-MM-DD).
   *
   * @response 200 - Appointments successfully retrieved.
   * @response 400 - Error retrieving appointments.
   *
   * @returns {Promise<ApiResponseDto<Appointment[]>>} A list of appointments for the given date.
   */
  @ApiBearerAuth()
  @Get('by-date/:date')
  async getAppointmentsByDate(
    @Param('date') date: string,
  ): Promise<ApiResponseDto<Appointment[]>> {
    return this.appointmentsService.getAppointmentsByDate(date);
  }
}

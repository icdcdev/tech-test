import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { AppointmentStatus } from 'src/enums/status.enums';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty({
    message: 'The date is not specified',
  })
  date: string;

  @IsNotEmpty({
    message: 'The patient is not specified',
  })
  @IsString()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
    message: 'Time must be in the format "hh:mm" (24-hour format)',
  })
  time: string;

  @IsNotEmpty({
    message: 'The patient is not specified',
  })
  @IsString()
  comments?: string;

  @IsEnum(AppointmentStatus)
  @IsNotEmpty({
    message: 'The status is not specified',
  })
  status: AppointmentStatus;

  @IsNotEmpty()
  clientId: number;

  @IsNotEmpty()
  vehicleId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/entities/client.entity';
import { AppointmentStatus } from 'src/enums/status.enums';
import { Vehicle } from 'src/vehicles/enitites/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the appointment',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2025-02-20',
    description: 'Date of the appointment (YYYY-MM-DD)',
  })
  @Column()
  date: string;

  @ApiProperty({
    example: '14:30',
    description: 'Time of the appointment (HH:mm)',
  })
  @Column()
  time: string;

  @ApiProperty({
    example: 'Client prefers a window seat',
    description: 'Additional comments for the appointment',
    required: false,
  })
  @Column({ nullable: true })
  comments: string;

  @ApiProperty({
    example: AppointmentStatus.ENABLED,
    description: 'Current status of the appointment',
    enum: AppointmentStatus,
    required: true,
  })
  @Column({
    enum: AppointmentStatus,
    default: AppointmentStatus.ENABLED,
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => Client,
    name: 'clientId',
    description: 'Client associated with the appointment',
    default: 1,
    required: true,
  })
  @ManyToOne(() => Client, (client) => client.appointments)
  client: Client;

  @ApiProperty({
    type: () => Vehicle,
    name: 'vehicleId',
    description: 'Vehicle associated with the appointment',
    default: 1,
    required: true,
  })
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.appointment)
  vehicle: Vehicle;
}

import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateVehicleDto {
  @IsString()
  @MaxLength(17)
  vin: string;

  @IsString()
  @MaxLength(10)
  licensePlate: string;

  @IsString()
  @MaxLength(20)
  color: string;

  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear())
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @IsString()
  @MaxLength(50)
  model: string;
}

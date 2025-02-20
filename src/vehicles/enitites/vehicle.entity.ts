import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the vehicle', example: 1 })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Vehicle identification number',
    example: '1HGBH41JXMN109186',
  })
  vin: string;

  @Column()
  @ApiProperty({
    description: 'License plate of the vehicle',
    example: 'XYZ1234',
  })
  licensePlate: string;

  @Column()
  @ApiProperty({ description: 'Color of the vehicle', example: 'Red' })
  color: string;

  @Column()
  @ApiProperty({
    description: 'Year of manufacture of the vehicle',
    example: 2020,
  })
  year: number;

  @Column()
  @ApiProperty({
    description: 'Model of the vehicle',
    example: 'Toyota Corolla',
  })
  model: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

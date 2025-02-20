import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @ApiProperty({
    description: 'Unique identifier of the client',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Full name of the client',
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Timezone of the client',
    example: 'America/Mexico_City',
  })
  @Column()
  timezone: string;

  @ApiProperty({
    description: 'Physical address of the client',
    example: '123 Main Street, Mexico City, MX',
  })
  @Column()
  address: string;

  @ApiProperty({
    description: 'Phone number of the client',
    example: '+525512345678',
  })
  @Column()
  phone: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}

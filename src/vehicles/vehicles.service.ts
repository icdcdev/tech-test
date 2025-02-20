import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './enitites/vehicle.entity';
import { Repository } from 'typeorm';
import { ApiResponseDto } from 'src/helpers/api_response.helper';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}
  async create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<ApiResponseDto<Vehicle>> {
    const existingVehicle = await this.vehiclesRepository.findOne({
      where: { vin: createVehicleDto.vin },
    });

    if (existingVehicle) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Vehicle with this VIN number already exists',
        data: existingVehicle,
      };
    }
    const vehicle = await this.vehiclesRepository.save(createVehicleDto);

    if (vehicle) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Vehicle created successfully',
        data: vehicle,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed to create vehicle',
      data: null,
    };
  }
}

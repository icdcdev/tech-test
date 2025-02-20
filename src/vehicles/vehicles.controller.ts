import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './enitites/vehicle.entity';
import { ApiResponseDtoCreateVehicle } from './dto/swagger/res-create-swagger-vehicle.dto';
import { ApiAppoimentDecorator } from 'src/decorators/create.decorator';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}
  /**
   * @summary Creates a new vehicle.
   *
   * @description This endpoint allows the creation of a vehicle using the provided
   * data, ensuring that the VIN number is unique to avoid duplicates.
   *
   * @auth Requires a valid Bearer token for authentication.
   *
   * @route POST /create-vehicle
   *
   * @param {CreateVehicleDto} createVehicleDto - The vehicle data to be created.
   *
   * @returns {Response} JSON response containing the created vehicle details.
   *
   * @throws {HttpStatus.BAD_REQUEST} If the VIN number already exists or the input is invalid.
   */
  @ApiAppoimentDecorator({
    summary: { summary: 'Create vehicle' },
    errorObject: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Error to create vehicle',
    },
    responseObject: {
      status: HttpStatus.OK,
      description:
        'You can only create a vehicle that does not leave, this was valid with their VIN number ',
      type: ApiResponseDtoCreateVehicle,
    },
    body: {
      type: Vehicle,
      description: 'The client data to be created.',
    },
  })
  @ApiBearerAuth()
  @Post('/create-vehicle')
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
    @Res() res: Response,
  ) {
    const vehicle = await this.vehiclesService.create(createVehicleDto);
    return res.status(vehicle.statusCode).json(vehicle);
  }
}

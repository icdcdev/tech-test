import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiAppoimentDecorator } from 'src/decorators/create.decorator';
import { ApiResponseDtoCreateClient } from './dto/swagger/res-create-swagger-client.dto';
import { Client } from './entities/client.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * @Controller ClientsController
 *
 * @description Handles client-related operations, such as creating new clients.
 */
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  /**
   * @summary Creates a new client.
   *
   * @description This endpoint allows the creation of a client only if they do not
   * already exist in the system. The validation is performed using their phone number.
   *
   * @auth Requires a valid Bearer token.
   *
   * @route POST /create-client
   *
   * @param {CreateClientDto} createClientDto - The client data to be created.
   *
   * @returns {Response} JSON response containing the created client details.
   *
   * @throws {HttpStatus.BAD_REQUEST} If the client already exists.
   */
  
  @ApiAppoimentDecorator({
    summary: { summary: 'Create Client' },
    errorObject: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Error to create client',
    },
    responseObject: {
      status: HttpStatus.OK,
      description:
        'You can only create a client that does not leave, this was valid with their cell phone number ',
      type: ApiResponseDtoCreateClient,
    },
    body: {
      type: Client,
      description: 'The client data to be created.',
    },
  })
  @ApiBearerAuth() // Decorator for authenticating
  @Post('/create-client')
  async create(@Body() createClientDto: CreateClientDto, @Res() res: Response) {
    const client = await this.clientsService.create(createClientDto);
    return res.status(client.statusCode).json(client);
  }
}

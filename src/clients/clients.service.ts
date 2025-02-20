import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseDto } from 'src/helpers/api_response.helper';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}
  async create(
    createClientDto: CreateClientDto,
  ): Promise<ApiResponseDto<Client>> {
    const existingClient = await this.clientsRepository.findOne({
      where: { phone: createClientDto.phone },
    });

    if (existingClient) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Client with this phone number already exists',
        data: existingClient,
      };
    }
    const client = await this.clientsRepository.save(createClientDto);

    if (client) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Client created successfully',
        data: client,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed to create client',
      data: null,
    };
  }
}

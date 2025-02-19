import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ApiResponseDto } from 'src/helpers/api_response.helper';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}
  async create(
    createClientDto: CreateClientDto,
  ): Promise<ApiResponseDto<Client>> {
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

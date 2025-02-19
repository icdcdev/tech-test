import {
  Body,
  Controller,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('/create-client')
  async create(@Body() createClientDto: CreateClientDto, @Res() res: Response) {
    const client = await this.clientsService.create(createClientDto);
    return res.status(client.statusCode).json(client);
  }
}

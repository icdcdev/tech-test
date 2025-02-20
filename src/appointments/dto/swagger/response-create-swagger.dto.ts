import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto, MessagesType } from 'src/helpers/api_response.helper';
import { HttpStatus } from '@nestjs/common';

export class ApiResponseDtoCreateAppoinment extends ApiResponseDto<string> {
  @ApiProperty({
    example: 'Created appointment',
  })
  message: MessagesType[] | [] | string | null;
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    description: 'JWT',
    example: {
      date: '2025-02-18',
      time: '11:59',
      comments:
        'Mantenimiento menor, mantenimiento mayor, y servicios especializados',
      status: 'HABILITADA',
      id: 1,
      client: {
        id: 1,
        name: 'Juan Pérez',
        timezone: 'America/Mexico_City',
        address: 'Calle Ficticia 123, Ciudad de México',
        createdAt: '2025-02-17T17:43:44.842Z',
        updatedAt: '2025-02-17T17:43:44.842Z',
      },
      vehicle: {
        id: 1,
        vin: '1HGBH41JXMN109186',
        licensePlate: 'ABC1234',
        color: 'Rojo',
        year: 2025,
        model: 'Toyota Corolla',
        createdAt: '2025-02-17T17:43:55.107Z',
        updatedAt: '2025-02-17T17:43:55.107Z',
      },
    },
    type: String,
  })
  data: string;
}

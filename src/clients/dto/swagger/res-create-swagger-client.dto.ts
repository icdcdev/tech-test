import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto, MessagesType } from 'src/helpers/api_response.helper';
import { HttpStatus } from '@nestjs/common';

export class ApiResponseDtoCreateClient extends ApiResponseDto<string> {
  @ApiProperty({
    example: 'Created appointment',
  })
  message: MessagesType[] | [] | string | null;
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    example: {
      statusCode: 200,
      message: 'Client created successfully',
      data: {
        name: 'Juan Pérez',
        timezone: 'America/Mexico_City',
        address: 'Calle Ficticia 123, Ciudad de México',
        phone: '+522225046421',
        id: 2,
        createdAt: '2025-02-20T01:12:18.117Z',
        updatedAt: '2025-02-20T01:12:18.117Z',
      },
    },
  })
  data: string;
}

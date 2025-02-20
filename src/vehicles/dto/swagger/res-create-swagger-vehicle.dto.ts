import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto, MessagesType } from 'src/helpers/api_response.helper';
import { HttpStatus } from '@nestjs/common';

export class ApiResponseDtoCreateVehicle extends ApiResponseDto<string> {
  @ApiProperty({
    example: 'Created vehicle',
  })
  message: MessagesType[] | [] | string | null;
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    example: {
      statusCode: 200,
      message: 'Vehicle created successfully',
      data: {
        vin: '1HGBH41JXMN109186',
        licensePlate: 'ABC1234',
        color: 'Rojo',
        year: 2025,
        model: 'Toyota Corolla',
        id: 1,
        createdAt: '2025-02-20T01:49:48.759Z',
        updatedAt: '2025-02-20T01:49:48.759Z',
      },
    },
  })
  data: string;
}

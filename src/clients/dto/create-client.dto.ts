import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({
    message: 'The name is not specified',
  })
  name: string;

  @IsNotEmpty({
    message: 'The timezone is not specified',
  })
  @IsString()
  timezone: string;

  @IsNotEmpty({
    message: 'The timezone is not specified',
  })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty({
    message: 'The address is not specified',
  })
  @IsString()
  address: string;
}

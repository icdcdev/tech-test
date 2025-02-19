import { HttpStatus } from '@nestjs/common';

export class MessagesType {
  message: string;
  property: string;
}

export class ApiResponseDto<T> {
  statusCode: HttpStatus;

  message: MessagesType[] | [] | string | Object | null;

  data: T;

  constructor(
    statusCode: number,
    message: MessagesType[] | [] | string | null,
    data: T,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

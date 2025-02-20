import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiAppoimentDecorator({
  summary = {},
  errorObject = {},
  responseObject = {},
  body = {},
}) {
  return applyDecorators(
    ApiOperation(summary),
    ApiResponse(responseObject),
    ApiResponse(errorObject),
    ApiBody(body),
  );
}

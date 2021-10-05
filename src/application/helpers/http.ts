import { ServerError, ValidationError } from '@/application/errors'
import { HttpResponse } from '@/application/contracts'

export const badRequest = (
  error: ValidationError
): HttpResponse<ValidationError> => {
  return {
    statusCode: 400,
    data: error
  }
}

export const serverError = (): HttpResponse<Error> => {
  return {
    statusCode: 500,
    data: new ServerError()
  }
}

import { ServerError, ValidationError } from '@/application/errors'
import { HttpResponse } from '@/application/contracts'

export const ok = <T = any>(data?: T): HttpResponse<T> => ({
  statusCode: 200,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  data: data ?? ({} as T)
})

export const conflict = (
  error: ValidationError
): HttpResponse<ValidationError> => {
  return {
    statusCode: 409,
    data: error
  }
}

export const unprocessableEntity = (error: Error): HttpResponse<Error> => {
  return {
    statusCode: 422,
    data: error
  }
}

export const serverError = (): HttpResponse<Error> => {
  return {
    statusCode: 500,
    data: new ServerError()
  }
}

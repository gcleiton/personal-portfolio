import { HttpResponse } from '@/application/contracts'
import { Validation } from '@/application/validation'
import { serverError, unprocessableEntity } from '@/application/helpers'

export abstract class Controller {
  constructor(private readonly validation?: Validation) {}

  abstract perform(request: any): Promise<HttpResponse>

  async handle(request: any): Promise<HttpResponse> {
    if (this.validation) {
      const errors = this.validation.validate(request)
      if (errors !== undefined) {
        return unprocessableEntity(errors)
      }
    }

    try {
      return await this.perform(request)
    } catch (error) {
      return serverError()
    }
  }
}

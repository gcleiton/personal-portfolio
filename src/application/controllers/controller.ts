import { HttpResponse, Validator } from '@/application/contracts'
import { ValidationComposite } from '@/application/validation'
import { badRequest, serverError } from '@/application/helpers'
import { ValidationError } from '@/application/errors'

export abstract class Controller {
  abstract perform(request: any): Promise<HttpResponse>

  buildValidators(request: any): Validator[] {
    return []
  }

  async handle(request: any): Promise<HttpResponse> {
    const error = this.validate(request)
    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      return await this.perform(request)
    } catch (error) {
      return serverError()
    }
  }

  private validate(request: any): ValidationError | undefined {
    const validators = this.buildValidators(request)
    return new ValidationComposite(validators).validate()
  }
}

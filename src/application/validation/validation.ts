import { Validator } from '@/application/contracts'
import { ValidationComposite } from './composite'

export abstract class Validation {
  abstract buildValidators(request: any): Validator[]

  validate(request: Request): Error[] | undefined {
    const validators = this.buildValidators(request)
    const composite = new ValidationComposite(validators)
    const error = composite.validate()
    if (error) {
      return error.errors
    }
  }
}

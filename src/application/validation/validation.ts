import { Validator } from '@/application/contracts'
import { ValidationError } from '@/application/errors'
import { ValidationComposite } from './composite'

export abstract class Validation {
  abstract buildValidators(request: any): Validator[]

  validate(request: Request): ValidationError | undefined {
    const validators = this.buildValidators(request)
    return new ValidationComposite(validators).validate()
  }
}

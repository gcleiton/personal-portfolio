import { Validator } from '@/application/contracts'
import { ValidationError } from '@/application/errors'

export class ValidationComposite implements Validator {
  constructor(
    private readonly validators: Validator[],
    private readonly errors: Error[] = []
  ) {}

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate()
      if (error !== undefined) {
        this.errors.push(error)
      }
    }

    return new ValidationError(this.errors)
  }
}

import { Validator } from '@/application/contracts'
import { ValidationError } from '@/application/errors'

export class ValidationComposite implements Validator {
  errors: Error[]

  constructor(private readonly validators: Validator[]) {
    this.errors = []
  }

  validate(): ValidationError | undefined {
    for (const validator of this.validators) {
      const error = validator.validate()
      if (error !== undefined) {
        this.errors.push(error)
      }
    }

    if (this.errors.length > 0) {
      return new ValidationError(this.errors)
    }
  }
}

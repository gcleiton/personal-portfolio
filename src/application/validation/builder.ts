import { Validator } from '@/application/contracts'
import {
  EmailValidator,
  RequiredValidator,
  StringMinValidator,
  StringRequiredValidator
} from '@/application/validation/validators'

type WithInput = {
  value: string
  fieldName: string
}

type MinInput = {
  minValue: number
}

type MaxInput = {
  maxValue: number
}

export class ValidationBuilder {
  constructor(
    private readonly value: string,
    private readonly validators: Validator[] = []
  ) {}

  static with(input: WithInput): ValidationBuilder {
    return new ValidationBuilder(input.value)
  }

  required(): ValidationBuilder {
    if (typeof this.value === 'string') {
      this.validators.push(new StringRequiredValidator(this.value))
    } else {
      this.validators.push(new RequiredValidator(this.value))
    }

    return this
  }

  min(input: MinInput): ValidationBuilder {
    if (typeof this.value === 'string') {
      this.validators.push(new StringMinValidator(this.value, input.minValue))
    }
    return this
  }

  max(input: MaxInput): ValidationBuilder {
    if (typeof this.value === 'string') {
      this.validators.push(new StringMinValidator(this.value, input.maxValue))
    }
    return this
  }

  email(): ValidationBuilder {
    this.validators.push(new EmailValidator(this.value))

    return this
  }

  build(): Validator[] {
    return this.validators
  }
}

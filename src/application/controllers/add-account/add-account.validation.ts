import { Validator } from '@/application/contracts'
import { ValidationBuilder, Validation } from '@/application/validation'
import { HttpRequest } from './add-account'

export class AddAccountValidation extends Validation {
  buildValidators(request: HttpRequest): Validator[] {
    return [
      ...this.usernameValidators(request.username),
      ...this.firstNameValidators(request.firstName),
      ...this.lastNameValidators(request.lastName),
      ...this.passwordValidators(request.password),
      ...this.emailValidators(request.email)
    ]
  }

  private usernameValidators(username: string): Validator[] {
    return ValidationBuilder.with({
      value: username,
      fieldName: 'username'
    })
      .required()
      .min(3)
      .max(32)
      .build()
  }

  private firstNameValidators(firstName: string): Validator[] {
    return ValidationBuilder.with({
      value: firstName,
      fieldName: 'firstName'
    })
      .required()
      .max(64)
      .build()
  }

  private lastNameValidators(lastName: string): Validator[] {
    return ValidationBuilder.with({
      value: lastName,
      fieldName: 'lastName'
    })
      .required()
      .max(64)
      .build()
  }

  private passwordValidators(password: string): Validator[] {
    return ValidationBuilder.with({
      value: password,
      fieldName: 'password'
    })
      .required()
      .min(6)
      .max(128)
      .build()
  }

  private emailValidators(email: string): Validator[] {
    return ValidationBuilder.with({
      value: email,
      fieldName: 'email'
    })
      .required()
      .email()
      .build()
  }
}

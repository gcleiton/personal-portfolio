export class ValidationError extends Error {
  errors: Error[]

  constructor(errors: Error[]) {
    super('Falha na Validação.')
    this.errors = errors
  }
}

export class RequiredFieldError extends Error {
  constructor() {
    super('O campo é obrigatório.')
  }
}

export class StringMinFieldError extends Error {
  constructor(value: number) {
    super(`O campo deve ter pelo menos ${value} caracteres.`)
  }
}

export class StringMaxFieldError extends Error {
  constructor(value: number) {
    super(`O campo deve ter no máximo ${value} caracteres.`)
  }
}

export class InvalidEmailError extends Error {
  constructor() {
    super('O campo deve ser um endereço de e-mail válido.')
  }
}

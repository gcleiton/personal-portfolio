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

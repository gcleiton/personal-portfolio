export class RequiredFieldError extends Error {
  constructor() {
    super('O campo é obrigatório.')
  }
}

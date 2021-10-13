export class ValidationError extends Error {
  constructor(private readonly _errors: Error[]) {
    super('Falha na Validação')
  }

  get errors(): Error[] {
    return this.errors
  }
}

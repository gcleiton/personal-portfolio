export class ServerError extends Error {
  constructor() {
    super('Servidor falhou. Tente novamente em breve.')
  }
}

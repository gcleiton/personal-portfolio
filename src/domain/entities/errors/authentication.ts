export class AuthenticationError extends Error {
  constructor() {
    super('Usuário ou senha incorretos.')
  }
}

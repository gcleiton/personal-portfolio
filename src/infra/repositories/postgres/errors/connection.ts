export class ConnectionNotFoundError extends Error {
  constructor() {
    super('No connection was found')
  }
}

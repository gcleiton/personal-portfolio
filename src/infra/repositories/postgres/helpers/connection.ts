import {
  Connection,
  createConnection,
  getConnection,
  getConnectionManager,
  ObjectType,
  Repository
} from 'typeorm'

import { ConnectionNotFoundError } from '@/infra/repositories/postgres/errors'

export class PostgresConnection {
  private static instance?: PostgresConnection
  private connection?: Connection

  private constructor() {}

  static getInstance(): PostgresConnection {
    if (PostgresConnection.instance === undefined) {
      PostgresConnection.instance = new PostgresConnection()
    }

    return PostgresConnection.instance
  }

  async connect(): Promise<void> {
    this.connection = getConnectionManager().has('default')
      ? getConnection()
      : await createConnection()
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    await getConnection().close()
    this.connection = undefined
  }

  isConnected(): boolean {
    return this.connection !== undefined
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.isConnected()) {
      throw new ConnectionNotFoundError()
    }

    return this.getRepository(entity)
  }
}

import { Connection, ObjectType, Repository } from 'typeorm'

import { ConnectionNotFoundError } from '@/infra/repositories/postgres/errors'

export class PostgresConnection {
  private static instance?: PostgresConnection
  private readonly connection?: Connection

  private constructor() {}

  static getInstance(): PostgresConnection {
    if (PostgresConnection.instance === undefined) {
      PostgresConnection.instance = new PostgresConnection()
    }

    return PostgresConnection.instance
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

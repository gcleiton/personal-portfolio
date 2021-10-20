import { Repository } from 'typeorm'

import { PostgresConnection } from '@/infra/repositories/postgres/helpers'

type EntityInstance<T> = new () => T

export abstract class PostgresRepository<T> {
  private readonly connection: PostgresConnection
  private readonly entity: EntityInstance<T>

  constructor(entity: EntityInstance<T>) {
    this.connection = PostgresConnection.getInstance()
    this.entity = entity
  }

  getRepository(): Repository<T> {
    return this.connection.getRepository(this.entity)
  }
}

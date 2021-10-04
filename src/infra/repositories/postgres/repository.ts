import { PostgresConnection } from '@/infra/repositories/postgres/helpers'
import { ObjectType, Repository } from 'typeorm'

export class PostgresRepository<Entity> {
  private readonly connection: PostgresConnection
  protected repository: Repository<Entity>

  constructor(entity: ObjectType<Entity>) {
    this.connection = PostgresConnection.getInstance()
    this.repository = this.connection.getRepository(entity)
  }
}

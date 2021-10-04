import {
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository
} from '@/domain/contracts/repositories'
import { User } from '@/infra/repositories/postgres/entities'
import { PostgresRepository } from './repository'

export class UserAccountRepository
  extends PostgresRepository<User>
  implements CheckAccountByUsernameRepository, CheckAccountByEmailRepository
{
  constructor() {
    super(User)
  }

  async checkByUsername(
    input: CheckAccountByUsernameRepository.Input
  ): Promise<boolean> {
    const account = await this.repository.findOne({ username: input.username })
    return account !== undefined
  }

  async checkByEmail(
    input: CheckAccountByEmailRepository.Input
  ): Promise<boolean> {
    const account = await this.repository.findOne({ email: input.email })
    return account !== undefined
  }
}

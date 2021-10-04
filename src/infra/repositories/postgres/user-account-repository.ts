import { CheckAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { User } from '@/infra/repositories/postgres/entities'
import { PostgresRepository } from './repository'

export class UserAccountRepository
  extends PostgresRepository<User>
  implements CheckAccountByUsernameRepository
{
  constructor() {
    super(User)
  }

  async checkByUsername(
    input: CheckAccountByUsernameRepository.Input
  ): Promise<boolean> {
    const user = await this.repository.findOne({ username: input.username })
    return user !== undefined
  }
}

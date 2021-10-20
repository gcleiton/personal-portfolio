import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository,
  LoadAccountByUsernameRepository
} from '@/domain/contracts/repositories'
import { User } from './entities'
import { PostgresRepository } from './repository'

export class PostgresUserAccountRepository
  extends PostgresRepository<User>
  implements
    CheckAccountByUsernameRepository,
    CheckAccountByEmailRepository,
    AddAccountRepository,
    LoadAccountByUsernameRepository
{
  constructor() {
    super(User)
  }

  async checkByUsername(
    input: CheckAccountByUsernameRepository.Input
  ): Promise<boolean> {
    const account = await this.getRepository().findOne({
      username: input.username
    })
    return account !== undefined
  }

  async checkByEmail(
    input: CheckAccountByEmailRepository.Input
  ): Promise<boolean> {
    const account = await this.getRepository().findOne({
      email: input.email
    })
    return account !== undefined
  }

  async add(
    input: AddAccountRepository.Input
  ): Promise<AddAccountRepository.Output> {
    const account = await this.getRepository().save(input)

    return {
      id: account.id.toString()
    }
  }

  async loadByUsername(
    input: LoadAccountByUsernameRepository.Input
  ): Promise<LoadAccountByUsernameRepository.Output> {
    const account = await this.getRepository().findOne({
      username: input.username
    })
    if (account) {
      return {
        id: account.id.toString(),
        username: account.username,
        password: account.password
      }
    }
  }
}

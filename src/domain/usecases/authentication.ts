import { LoadAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { Authentication } from '@/domain/contracts/usecases'
import { AuthenticationError } from '@/domain/entities/errors'

export class AuthenticationUseCase {
  constructor(
    private readonly accountRepository: LoadAccountByUsernameRepository
  ) {}

  async perform(input: Authentication.Input): Promise<void> {
    const account = await this.accountRepository.checkByUsername({
      username: input.username
    })

    if (account === undefined) {
      throw new AuthenticationError()
    }
  }
}

import { LoadAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { Authentication } from '@/domain/contracts/usecases'

export class AuthenticationUseCase {
  constructor(
    private readonly accountRepository: LoadAccountByUsernameRepository
  ) {}

  async perform(input: Authentication.Input): Promise<void> {
    await this.accountRepository.checkByUsername({ username: input.username })
  }
}

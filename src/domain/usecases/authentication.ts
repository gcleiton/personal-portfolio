import { LoadAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { Authentication } from '@/domain/contracts/usecases'
import { AuthenticationError } from '@/domain/entities/errors'
import { HashComparer } from '@/domain/contracts/gateways'

export class AuthenticationUseCase {
  constructor(
    private readonly accountRepository: LoadAccountByUsernameRepository,
    private readonly cryptography: HashComparer
  ) {}

  async perform(input: Authentication.Input): Promise<void> {
    const account = await this.accountRepository.checkByUsername({
      username: input.username
    })

    if (account) {
      await this.cryptography.compare({
        plainText: input.password,
        digest: account.password
      })
    }

    if (account === undefined) {
      throw new AuthenticationError()
    }
  }
}

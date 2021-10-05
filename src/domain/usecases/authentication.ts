import { LoadAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { Authentication } from '@/domain/contracts/usecases'
import { AuthenticationError } from '@/domain/entities/errors'
import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import { AccessToken } from '@/domain/entities'

export class AuthenticationUseCase {
  constructor(
    private readonly accountRepository: LoadAccountByUsernameRepository,
    private readonly cryptography: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async perform(input: Authentication.Input): Promise<void> {
    const account = await this.accountRepository.checkByUsername({
      username: input.username
    })

    if (account) {
      const isValidPassword = await this.cryptography.compare({
        plainText: input.password,
        digest: account.password
      })

      if (isValidPassword) {
        await this.tokenGenerator.generate({
          key: account.id,
          expirationInMs: AccessToken.expirationInMs
        })
      }

      if (!isValidPassword) throw new AuthenticationError()
    } else {
      throw new AuthenticationError()
    }
  }
}

import {
  AddRefreshTokenRepository,
  LoadAccountByUsernameRepository
} from '@/domain/contracts/repositories'
import { Authentication } from '@/domain/contracts/usecases'
import { AuthenticationError } from '@/domain/entities/errors'
import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import { AccessToken, RefreshToken, Result } from '@/domain/entities'

type Input = Authentication.Input
type Output = Authentication.Output

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly accountRepository: LoadAccountByUsernameRepository,
    private readonly cryptography: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly tokenRepository: AddRefreshTokenRepository
  ) {}

  async perform(input: Input): Promise<Output> {
    const account = await this.accountRepository.loadByUsername({
      username: input.username
    })

    if (account) {
      const isValidPassword = await this.cryptography.compare({
        plainText: input.password,
        digest: account.password
      })

      if (isValidPassword) {
        const accessToken = await this.tokenGenerator.generate({
          key: account.id,
          expirationInMs: AccessToken.expirationInMs
        })

        const refreshTokenModel = new RefreshToken(account.id)
        const refreshToken = await this.tokenRepository.add(refreshTokenModel)

        return Result.done({
          accessToken,
          refreshToken
        })
      }
    }

    return Result.failure(new AuthenticationError())
  }
}

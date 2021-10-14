import { AddAccountUseCase, AuthenticationUseCase } from '@/domain/usecases'
import {
  createPostgresRefreshTokenRepository,
  createPostgresUserAccountRepository
} from '@/main/factories/repositories/postgres'
import {
  createBcryptCryptography,
  createJwtToken
} from '@/main/factories/gateways'

export const createAddAccountUseCase = (): AddAccountUseCase => {
  return new AddAccountUseCase(
    createPostgresUserAccountRepository(),
    createBcryptCryptography()
  )
}

export const createAuthenticationUseCase = (): AuthenticationUseCase => {
  return new AuthenticationUseCase(
    createPostgresUserAccountRepository(),
    createBcryptCryptography(),
    createJwtToken(),
    createPostgresRefreshTokenRepository()
  )
}

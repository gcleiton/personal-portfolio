import {
  PostgresRefreshTokenRepository,
  PostgresUserAccountRepository
} from '@/infra/repositories/postgres'

export const createPostgresUserAccountRepository =
  (): PostgresUserAccountRepository => {
    return new PostgresUserAccountRepository()
  }

export const createPostgresRefreshTokenRepository =
  (): PostgresRefreshTokenRepository => {
    return new PostgresRefreshTokenRepository()
  }

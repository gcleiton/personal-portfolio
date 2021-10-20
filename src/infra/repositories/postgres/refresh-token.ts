import { AddRefreshTokenRepository } from '@/domain/contracts/repositories'
import { RefreshToken } from '@/infra/repositories/postgres/entities'
import { PostgresRepository } from './repository'

export class PostgresRefreshTokenRepository
  extends PostgresRepository<RefreshToken>
  implements AddRefreshTokenRepository
{
  constructor() {
    super(RefreshToken)
  }

  async add(
    input: AddRefreshTokenRepository.Input
  ): Promise<AddRefreshTokenRepository.Output> {
    const refreshToken = await this.getRepository().save({
      userId: input.userId,
      expiresAt: input.expiresIn
    })

    return refreshToken.id
  }
}

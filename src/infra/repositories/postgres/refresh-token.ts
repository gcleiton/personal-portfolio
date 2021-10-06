import { AddRefreshTokenRepository } from '@/domain/contracts/repositories'
import { RefreshToken } from '@/infra/repositories/postgres/entities'
import { PostgresRepository } from './repository'

export class RefreshTokenRepository
  extends PostgresRepository<RefreshToken>
  implements AddRefreshTokenRepository
{
  constructor() {
    super(RefreshToken)
  }

  async add(
    input: AddRefreshTokenRepository.Input
  ): Promise<AddRefreshTokenRepository.Output> {
    const refreshToken = await this.repository.save(input)

    return refreshToken.id
  }
}

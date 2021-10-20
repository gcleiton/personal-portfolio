export interface AddRefreshTokenRepository {
  add: (
    input: AddRefreshTokenRepository.Input
  ) => Promise<AddRefreshTokenRepository.Output>
}

export namespace AddRefreshTokenRepository {
  export type Input = {
    userId: string
    expiresIn: string
  }

  export type Output = string
}

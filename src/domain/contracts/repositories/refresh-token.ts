export interface AddRefreshTokenRepository {
  add: (
    input: AddRefreshTokenRepository.Input
  ) => Promise<AddRefreshTokenRepository.Output>
}

export namespace AddRefreshTokenRepository {
  export type Input = {
    userId: number
    expiresIn: string
  }

  export type Output = string
}

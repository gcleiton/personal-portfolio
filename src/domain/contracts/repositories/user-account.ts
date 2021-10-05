export interface CheckAccountByUsernameRepository {
  checkByUsername: (
    input: CheckAccountByUsernameRepository.Input
  ) => Promise<CheckAccountByUsernameRepository.Output>
}

export namespace CheckAccountByUsernameRepository {
  export type Input = {
    username: string
  }

  export type Output = boolean
}

export interface CheckAccountByEmailRepository {
  checkByEmail: (
    input: CheckAccountByEmailRepository.Input
  ) => Promise<CheckAccountByEmailRepository.Output>
}

export namespace CheckAccountByEmailRepository {
  export type Input = {
    email: string
  }

  export type Output = boolean
}

export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<void>
}

export namespace AddAccountRepository {
  export type Input = {
    username: string
    firstName: string
    lastName: string
    password: string
    email: string
  }
}

export interface LoadAccountByUsernameRepository {
  checkByUsername: (
    input: LoadAccountByUsernameRepository.Input
  ) => Promise<LoadAccountByUsernameRepository.Output>
}

export namespace LoadAccountByUsernameRepository {
  export type Input = {
    username: string
  }

  export type Output =
    | undefined
    | {
        id: string
        username: string
        password: string
      }
}

export interface AddRefreshTokenRepository {
  addRefreshToken: (
    input: AddRefreshTokenRepository.Input
  ) => Promise<AddRefreshTokenRepository.Output>
}

export namespace AddRefreshTokenRepository {
  export type Input = {
    userId: string
    expiresIn: string
  }

  export type Output = {
    id: string
    expiresAt: string
    userId: string
  }
}
